import joblib
import random
import numpy as np
import pandas as pd
from flask import Flask, redirect, render_template, url_for, request, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return redirect("/diabetes")

@app.route("/diabetes")
def diabetes():
    staticURL = url_for('static', filename='scripts/diabetesform.js')
    return render_template("diabetes.html", staticURL=staticURL)

@app.route("/heart")
def heart():
    staticURL = url_for('static', filename='scripts/heartform.js')
    return render_template("heart.html", staticURL=staticURL)

@app.route("/parkinsons")
def parkinsons():
    staticURL = url_for('static', filename='scripts/parkinsonsform.js')
    return render_template("parkinsons.html", staticURL=staticURL)

@app.route("/diabetes/random")
def diabetesrandom():
    data_frame = pd.read_csv("./multiple_disease/diabetes.csv")
    random_row_index = random.randint(0, len(data_frame) - 1)
    random_row = data_frame.iloc[random_row_index]
    random_values = {column: int(random_row[column]) if isinstance(random_row[column], np.int64) else random_row[column] for column in data_frame.columns}
    return jsonify(random_values)

@app.route("/heart/random")
def heartrandom():
    data_frame = pd.read_csv("./multiple_disease/heart.csv")
    random_row_index = random.randint(0, len(data_frame) - 1)
    random_row = data_frame.iloc[random_row_index]
    random_values = {column: int(random_row[column]) if isinstance(random_row[column], np.int64) else random_row[column] for column in data_frame.columns}
    return jsonify(random_values)

@app.route("/parkinsons/random")
def parkinsonsrandom():
    data_frame = pd.read_csv("./multiple_disease/parkinsons.csv")
    random_row_index = random.randint(0, len(data_frame) - 1)
    random_row = data_frame.iloc[random_row_index]
    random_values = {column: int(random_row[column]) if isinstance(random_row[column], np.int64) else random_row[column] for column in data_frame.columns}
    return jsonify(random_values)

@app.route("/diabetes/predict", methods=["POST"])
def diabetespredict():
    pregnancies = request.form.get("Pregnancies")
    glucose = request.form.get("Glucose")
    bloodpressure = request.form.get("BloodPressure")
    skinthickness = request.form.get("SkinThickness")
    insulin = request.form.get("Insulin")
    bmi = request.form.get("BMI")
    diabetespedigreefunction = request.form.get("DiabetesPedigreeFunction")
    age = request.form.get("Age")
    diabetesclassifier = joblib.load("./models/diabetes_classifier.sav")
    predictions = diabetesclassifier.predict([[pregnancies, glucose, bloodpressure, skinthickness, insulin, bmi, diabetespedigreefunction, age]])
    if predictions[0] == 1:
        return jsonify({"message": "The person is diabetic", "status": "danger"})
    else:
        return jsonify({"message": "The person is not diabetic", "status": "success"})

@app.route("/heart/predict", methods=["POST"])
def heartpredict():
    age = request.form.get("age")
    sex = request.form.get("sex")
    cp = request.form.get("cp")
    trestbps = request.form.get("trestbps")
    chol = request.form.get("chol")
    fbs = request.form.get("fbs")
    restecg = request.form.get("restecg")
    thalach = request.form.get("thalach")
    exang = request.form.get("exang")
    oldpeak = request.form.get("oldpeak")
    slope = request.form.get("slope")
    ca = request.form.get("ca")
    thal = request.form.get("thal")
    heartclassifier = joblib.load("./models/heart_classifier.sav")
    predictions = heartclassifier.predict([[age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal]])
    if predictions[0] == 1:
        return jsonify({"message": "The person is having heart disease", "status": "danger"})
    else:
        return jsonify({"message": "The person does not have any heart disease", "status": "success"})

@app.route("/parkinsons/predict", methods=["POST"])
def parkinsonspredict():
    fo = request.form.get("fo")
    fhi = request.form.get("fhi")
    flo = request.form.get("flo")
    Jitter_percent = request.form.get("Jitter_percent")
    Jitter_Abs = request.form.get("Jitter_Abs")
    RAP = request.form.get("RAP")
    PPQ = request.form.get("PPQ")
    DDP = request.form.get("DDP")
    Shimmer = request.form.get("Shimmer")
    Shimmer_dB = request.form.get("Shimmer_dB")
    APQ3 = request.form.get("APQ3")
    APQ5 = request.form.get("APQ5")
    APQ = request.form.get("APQ")
    DDA = request.form.get("DDA")
    NHR = request.form.get("NHR")
    HNR = request.form.get("HNR")
    RPDE = request.form.get("RPDE")
    DFA = request.form.get("DFA")
    spread1 = request.form.get("spread1")
    spread2 = request.form.get("spread2")
    D2 = request.form.get("D2")
    PPE = request.form.get("PPE")
    parkinsonsclassifier = joblib.load("./models/parkinsons_classifier.sav")
    predictions = parkinsonsclassifier.predict([[fo, fhi, flo, Jitter_percent, Jitter_Abs, RAP, PPQ, DDP, Shimmer, Shimmer_dB, APQ3, APQ5, APQ, DDA, NHR, HNR, RPDE, DFA, spread1, spread2, D2, PPE]])
    if predictions[0] == 1:
        return jsonify({"message": "The person has Parkinson's disease", "status": "danger"})
    else:
        return jsonify({"message": "The person does not have Parkinson's disease", "status": "success"})

if __name__ == "__main__":
    from waitress import serve
    serve(app)