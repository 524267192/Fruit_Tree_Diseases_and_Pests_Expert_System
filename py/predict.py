from flask import Flask, render_template,request,jsonify
from flask import request
from tensorflow import keras
import tensorflow as tf
import  time
import pymysql
from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources=r'/*')
import requests
import io
from PIL import Image
import os

"""
参考链接：
https://blog.csdn.net/qq_41375318/article/details/106106368
"""
"""
1.在第一个最小的 Flask 应用基础上，我们增加模型预测接口，这里注意：启动之前把 IP 地址修改为自己本机的地址或者服务器工作站所在的 IP 地址。
2.完整的代码如下，首先在启动之前先把模型预加载到内存中，然后重新定义 predict 函数，接受一个参数 sen：
3. /upload_image 在@app.route("/upload_image", methods=['POST'])中，
表示默认目录下的upload_image函数或者虚拟路径，即在http://192.168.137.1:5000/后面加上upload_image时就可以运行下面的函数
4.templates 文件夹是下的网页程序会自动寻找，名字必须一样
"""


# 根据一个图片的路径预测图片的种类
def getPredict2(file_name):
    IMG_SIZE = (255, 255)
    img = keras.preprocessing.image.load_img(file_name,
        target_size=IMG_SIZE
    )

    img_array = keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)  # Create batch axis
    #中文种类
    chinavariety = ["苹果___苹果_痂", "苹果___黑_腐烂", "苹果___雪松苹果锈", "苹果___健康",
               "樱桃_（含_酸）___粉_霉", "樱桃_（含_酸）___健康", "葡萄___黑腐病", "葡萄___黑疹",
               "葡萄___叶枯病",
               "葡萄___健康",
               "桃子___细菌_现货",
               "桃子___健康",
               "草莓___叶子_焦黄",
               "草莓___健康"]

    # 英文种类
    variety=["Apple_Apple_scab","Apple_Black_rot","Apple_Cedar_apple_rust","Apple_healthy",
             "Cherry_(including_sour)___Powdery_mildew","Cherry_(including_sour)___healthy","Grape__Black_rot","Grape___Esca_(Black_Measles)",
             "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)","Grape__healthy","Peach__Bacterial_spot",
             "Peach_healthy","Strawberry_Leaf_scorch","Strawberry__healthy",]
    predictions = model.predict(img_array)
    # 为14个模型的可能性，选出最大的类
    maxNumber = max(predictions[0])
    maxIndex = predictions[0].tolist().index(maxNumber)
    #前面split去除路径，后面split去除文件名后缀
    # result = "预测的结果为：", variety[maxIndex], ";实际的结果为：" + file_name.split("/")[-1].split(".")[0], ";置信度为95.2%"
    # print(result)
    return variety[maxIndex]

# "C:\Users\jie\PycharmProjects\pythonProject\PycharmProjects\python
# \javaweb\finalExam\plantDiseases\test\Apple___Apple_scab_1.JPG"
# 访问首页时的调用函数
@app.route('/')
def index_page():
    # file = request.files.get('file1')
    # file.save('./static/aaa.txt')
    return "在URL上输入图片url进行预测！"
    # return render_template('index.html')


path = "./uploadImage/1.jpg"
# 例如百度：http://192.168.137.1:5000/d/?wd=%E7%AE%80%E4%B9%A6&pn=20
# http://localhost:5000/upload-image-url?path=40f860b0644341078a1953dec696967b-20210628040414996.png
@app.route('/ir/')
def d():
    pic_url = "http://smpe.linbolun.cn/api/file/download/16642ed01dbf4698b81df458c615b3c5-20210628061944308.png"
    r = requests.get(pic_url)
    f = io.BytesIO(r.content)
    im = Image.open(f)
    im.convert('RGB').save(path)
    print(1111)
    return "保存成功"

# 16642ed01dbf4698b81df458c615b3c5-20210628061944308.png
# 第一种：使用path的形式（将参数嵌入到路径中），
# 格式：http://127.0.0.1:5000/url/?path=16642ed01dbf4698b81df458c615b3c5-20210628061944308.png
# 注意加?path=
@app.route("/url/")
def anyname_you_like():
    received_url = request.args.get("path")
    print(received_url)
    pic_url = "http://smpe.linbolun.cn/api/file/download/{}".format(received_url)
    print(pic_url)
    headers={
        "Access-Control-Allow-Origin":"*",
        "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyYThlNjg3MTMzYTU0OWUzOTZhZjllZTM4ZWNlMDdmNyIsImF1dGgiOiJhZG1pbiIsInN1YiI6IjEifQ.TSdeTdEyTpNbVqNb2gjuIHzxsXBa4NXj3S7Nx6Ew3ScVZHHvRT4xsiCzQPv4Dz0JtmViHn_6vJGDIfh2A_M3eQ",
        "Content-Type": "application/json",
    }

    r = requests.get(pic_url,headers=headers)
    # r = requests.get(received_url, headers=headers)
    f = io.BytesIO(r.content)
    im = Image.open(f)
    path = "./uploadImage/1.jpg"
    im.convert('RGB').save(path)
    local_url = path

# http://smpe.linbolun.cn/api/file/download/16642ed01dbf4698b81df458c615b3c5-20210628061944308.png
    startTime = time.time()
    d = {
        "illnessState": None,
        "illnessId": None,
    }
    if local_url:
        # 根据文件的url进行预测，返回预测结果
        print(local_url)
        result = getPredict2(local_url)
        print(result)

        path = 'local_url'  # 文件路径
        if os.path.exists(path):  # 如果文件存在
            # 删除文件，可使用以下两种方法。
            os.remove(path)


        try:
            result1 = str(result).split("_")[1:]
            if result1[-1] == "healthy":
                d["illnessState"] = 1
                return jsonify(d)
            # result = "_".join(result)
            #从远程数据库中搜索数的id
            db = pymysql.connect(host='121.196.160.185', port=3306, user='root', passwd='991012', db='diseases_insect_pests', charset='utf8mb4')
            cursor = db.cursor()
            sql = "select id from illness where illness_en=\"{}\"".format(result)
            cursor.execute(sql)
            id = cursor.fetchone()
            if len(id) == 0:
                # d["illnessId"] = 1
                d["illnessState"] = 3
                return jsonify(d)
            else:
                d["illnessId"] = id[0]
                d["illnessState"] = 2
        except Exception as e:
            # d["illnessId"] = 1
            d["illnessState"] = 2
            return jsonify(d)
        usedTime = time.time() - startTime
        print('完成对接收图片的预测，总共耗时%.2f秒' % usedTime)
        return jsonify(d)
    else:
        d["illnessState"] = 3
        # d["illnessId"] = 1

        if os.path.exists(path):  # 如果文件存在
            # 删除文件，可使用以下两种方法。
            os.remove(path)
        return jsonify(d)


if __name__ == '__main__':
    model_path = r"model_01.h5"
    from keras.models import load_model  # 最后一个独自加的load_model用于保存模型
    model = load_model(model_path)
    # 本地测试
    # getPredict2(r"C:\Users\jie\PycharmProjects\pythonProject\PycharmProjects\python\javaweb\finalExam\plantDiseases\test\Apple___Apple_scab_1.JPG")
    # 放到服务器只需修改host参数即可
    app.run(host='0.0.0.0', debug=True)