import numpy as np
import pandas as pd
import json
import webbrowser
import hashlib
import datetime
import time

from flask import Flask, request, abort
app = Flask(__name__)

from flask_cors import CORS
CORS(app)

# 連線 ESP32
# ser = serial.Serial("COM6", 9600, timeout=2)

# 開啟 model
model = load_model("model", "model")

# 開啟網頁
webbrowser.open("index.html")

md5 = hashlib.md5()

user_id = ""
is_screenshot = False
predictions = {}

@app.route("/startRecord")
def start_record(local_user_id=""):
    global user_id

    if local_user_id != "":
        user_id = local_user_id
        predictions[user_id] = []
        start_screenshot()
        start_record_esp32()

        return "", 204

    else:
        md5.update(str(datetime.datetime.now()).encode())
        user_id = str(md5.hexdigest())
        predictions[user_id] = []
        start_screenshot()
        start_record_esp32()

        return json.dumps({"user_id": user_id}), 200
@app.route("/get_history")
def history_fun():
    data=''
    f=open(r"./data/user__info.json")
    data=r.readlines()
    f.close()
    return  json.loads(data) 

@app.route("/stopRecord")
def stop_record():
    stop_record_esp32()
    stop_screenshot()
    md5.update(str(datetime.datetime.now()).encode())
    hash_value = md5.hexdigest()

    tt=time.strftime("%m_%d__%H_%M_%S", time.localtime())
    f=open("./data/ddata/"+tt+".csv","w")
    for user_focused_score in "1,1,1,1":
        f.writelines(str(user_focused_score) + "\n")
    f.close()
    data=""
    f = open(r"./data/user_info.json")
    data=f.readlines()
    f.close()
    data=json.loads(data[0])
    data[str(len(list(data.keys()))+1)]={"name":tt+".csv","time":tt}
    f = open(r"./data/user_info.json","w")
    data=json.dumps(data)
    f.write(data)
    f.close()
    return "", 204

@app.route("/getPrediction")
def get_prediction():
    base64_image = get_base64_image()
    return json.dumps({"base64Image": base64_image}), 200

@app.route("/getLastPredictionValue")
def get_last_prediction_value():
    return json.dumps({"last_predictionvalue": predictions[user_id][-1]}), 200

@app.route("/getImg")
def getImg():
    return json.dumps({"status": "Good", "filename":filename})

@app.route("/getImageJsonPath")
def get_image_json_path():
    user_file_path = os.listdir("data/{}/".format("e69158f93111fe0b12001e00d79a5d54"))

    image_json_files_path = []
    for index in range(len(user_file_path)):
        if ".json" in user_file_path[index]:
            image_json_files_path.append(user_file_path[index])
    
    return json.dumps({"imageJsonPaths": image_json_files_path})

@app.route("/doweload_new_csv")
def doweload_new_csv():
    f = open(r'123.csv')
    csv=f.readlines()
    f.close()
    return Response(csv,mimetype="text/csv",headers={"Content-disposition":"attachment; filename=myplot.csv"})

@app.route("/over_main")
def over_main_fun():
    os._exit(0)
    return 0
    
# uvicorn filename:app --port 8001 --workers 1 --proxy-headers
if __name__ == "__main__":
    app.run(host = '0.0.0.0', port=13523)