import numpy as np
import pandas as pd
import sys
import json
import webbrowser
import hashlib
import datetime
import random

from flask import Flask, request, abort
app = Flask(__name__)

from flask_cors import CORS
CORS(app)

# 連線 ESP32
# ser = serial.Serial("COM6", 9600, timeout=2)

# 開啟 model
#model = load_model("model", "model")

# 開啟網頁
#webbrowser.open("index.html")

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
        # start_screenshot()
        # start_record_esp32()

        return "", 204

    else:
        md5.update(str(datetime.datetime.now()).encode())
        user_id = str(md5.hexdigest())
        predictions[user_id] = []
        # start_screenshot()
        # start_record_esp32()

        return json.dumps({"user_id": user_id}), 200

@app.route("/stopRecord")
def stop_record():
    # stop_record_esp32()
    # stop_screenshot()
    md5.update(str(datetime.datetime.now()).encode())
    hash_value = md5.hexdigest()
    with open("./data/{}/{}_{}.csv".format(user_id, user_id, hash_value), 'w') as f:
        for user_focused_score in predictions[user_id]:
            f.writelines(str(user_focused_score) + "\n")

    return "", 204

@app.route("/getPrediction")
def get_prediction():
    base64_image = get_base64_image()
    return json.dumps({"base64Image": base64_image}), 200

@app.route("/getLastPredictionValue")
def get_last_prediction_value():
    return json.dumps({"v":str(random.randint(0,99))}) #json.dumps({"last_predictionvalue": predictions[user_id][-1]}), 200

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

@app.route("/stopAll")
def stop_All():
    return sys.exit()

# uvicorn filename:app --port 8001 --workers 1 --proxy-headers
if __name__ == "__main__":
    app.run(host = '0.0.0.0', port=13523)