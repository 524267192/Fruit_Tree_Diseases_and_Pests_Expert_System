"""
由于图片数量过多，这里保留每个文件夹下200张图片
"""

import os
def del_files(test_path):
    for root, dirs, files in os.walk(test_path):
        cur_path = os.getcwd()
        update_path = os.getcwd()#cur_path\update_path是我觉得用的最好的地方
        for name in files:
            files_size = len(files)
            update_path = root
            if update_path != cur_path:
                flag = 0
            if name.endswith(".JPG"):   #指定要删除的格式，这里是jpg 可以换成其他格式
                flag += 1
                if(flag < files_size-200):
                    os.remove(os.path.join(root, name))
                    cur_path = root
                    print ("Delete File: " + os.path.join(root, name))
                else: break
# test

if __name__ == "__main__":

    # dir_path = os.path.join(r"C:\Users\jie\Desktop\New Plant Diseases Dataset(Augmented)",'train')
    # path = os.path.join(dir_path,'valid')
    del_files(r"C:\Users\jie\Desktop\New Plant Diseases Dataset(Augmented)(all)\train")
    del_files(r"C:\Users\jie\Desktop\New Plant Diseases Dataset(Augmented)(all)\valid")
    print('end')