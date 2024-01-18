import numpy as np
from re import sub
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import metrics
import matplotlib.pyplot as plt
from tensorflow.keras.preprocessing import image_dataset_from_directory
"""
训练模型
数据集：https://www.kaggle.com/abdallahalidev/plantvillage-dataset
"""
print("Done importing packages!")

BATCH_SIZE = 32
IMG_SIZE = (255, 255)

"""
当前数据集中每类照片100张，第三轮准确率0.594
"""


data_dir = r"C:/Users/jie/Desktop/New Plant Diseases Dataset(Augmented)(all)/train"
# data_dir = "../input/plantvillage-dataset/color"
train_dataset = image_dataset_from_directory(data_dir,
                                             shuffle=True,
                                             label_mode='categorical',
                                             validation_split=0.4,  # 0.4
                                             batch_size=BATCH_SIZE,
                                             seed=42,
                                             subset="training",
                                             # color_mode="grayscale",
                                             image_size=IMG_SIZE)

validation_dataset = image_dataset_from_directory(data_dir,
                                                  shuffle=True,
                                                  label_mode='categorical',
                                                  validation_split=0.4,
                                                  batch_size=BATCH_SIZE,
                                                  seed=42,
                                                  subset="validation",
                                                  # color_mode="grayscale",
                                                  image_size=IMG_SIZE)

class_names = train_dataset.class_names
num_classes = len(class_names)


def showPicture():
    for i in range(1, num_classes + 1):
        print(str(i) + ". ", class_names[i - 1])

    fig = plt.figure(figsize=(10, 10), constrained_layout=True)

    for images, labels in train_dataset.take(1):
        for i in range(9):
            ax = plt.subplot(3, 3, i + 1)
            plt.imshow(images[i].numpy().astype("uint8"))
            title = sub(r"[_]+", "_", class_names[np.argmax(labels[i])])
            plt.title(title)
            plt.axis("off")

    plt.figure(figsize=(10, 10), constrained_layout=True)
    for images, labels in validation_dataset.take(1):
        for i in range(9):
            ax = plt.subplot(3, 3, i + 1)
            plt.imshow(images[i].numpy().astype("uint8"))
            title = sub(r"[_]+", "_", class_names[np.argmax(labels[i])])
            plt.title(title)
            plt.axis("off")

    plt.show()



val_batches = tf.data.experimental.cardinality(validation_dataset)
test_dataset = validation_dataset.take(val_batches // 3)
validation_dataset = validation_dataset.skip(val_batches // 3)

print('Number of validation batches: %d' % tf.data.experimental.cardinality(validation_dataset))
print('Number of test batches: %d' % tf.data.experimental.cardinality(test_dataset))

AUTOTUNE = tf.data.AUTOTUNE

train_dataset = train_dataset.prefetch(buffer_size=AUTOTUNE)
validation_dataset = validation_dataset.prefetch(buffer_size=AUTOTUNE)
test_dataset = test_dataset.prefetch(buffer_size=AUTOTUNE)

# add more augmentations
data_augmentation = tf.keras.Sequential([
    tf.keras.layers.experimental.preprocessing.RandomFlip('horizontal'),
    tf.keras.layers.experimental.preprocessing.RandomRotation(0.2),
])

METRICS = [
    metrics.CategoricalAccuracy(name='accuracy'),
    metrics.Precision(name='precision'),
    metrics.Recall(name='recall'),
]

IMG_SHAPE = IMG_SIZE + (3,)
preprocess_input = tf.keras.applications.inception_resnet_v2.preprocess_input

base_model = tf.keras.applications.InceptionResNetV2(
    include_top=False,
    weights="imagenet",
    input_shape=IMG_SHAPE,
)

image_batch, label_batch = next(iter(train_dataset))
feature_batch = base_model(image_batch)
print(feature_batch.shape)

base_model.trainable = False

global_average_layer = tf.keras.layers.GlobalAveragePooling2D()
feature_batch_average = global_average_layer(feature_batch)

print(feature_batch_average.shape)

prediction_layer = tf.keras.layers.Dense(num_classes, activation="softmax")
prediction_batch = prediction_layer(feature_batch_average)
print(prediction_batch.shape)

inputs = tf.keras.Input(shape=(255, 255, 3))
x = data_augmentation(inputs)
x = preprocess_input(x)
x = base_model(x, training=False)
x = global_average_layer(x)
x = tf.keras.layers.Dropout(0.2)(x)
outputs = prediction_layer(x)
model = tf.keras.Model(inputs, outputs)

base_learning_rate = 0.001
model.compile(optimizer=tf.keras.optimizers.Adam(lr=base_learning_rate),
              loss=tf.keras.losses.CategoricalCrossentropy(from_logits=True),
              metrics=METRICS)

model.summary()

#训练的轮数
initial_epochs = 20

history = model.fit(train_dataset,
                    epochs=initial_epochs,
                    validation_data=validation_dataset)


model.save('model_01.h5')

result = model.evaluate(test_dataset)
print(result)
metrics = ["loss", "accuracy", "precision", "recall"]

for i in range(len(result)):
    print("{} : {}".format(metrics[i], round(result[i], 3)))






