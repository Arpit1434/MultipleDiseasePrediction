# Multiple Disease Prediction

This Machine Learning model uses [SVC(Support Vector Classification)](https://scikit-learn.org/stable/modules/generated/sklearn.svm.SVC.html) to classsify and predict people with diseases like Diabetes, Heart Diseases, and Parkinson's. I have used datasets from kaggle openly available to train my model for which I would like to give due credit.
- [Diabetes Dataset](https://www.kaggle.com/datasets/mathchi/diabetes-data-set)
- [Heart Disease Dataset](https://www.kaggle.com/datasets/johnsmith88/heart-disease-dataset)
- [Parkinson's Dataset](https://www.kaggle.com/datasets/vikasukani/parkinsons-disease-data-set)

## The Impact

With the eruption of a new era of AI/ML, This project aims to help medical professionals help classify diseases with ease. It will for surely help those sections of people lacking in advance medical technologies help identify diseases and get people medical care, which is crucial, even more so to identify it in the early stages to reduce risk.

## The Process

### The ML Model

1. Loading the data and splitting it into train and test data
2. Using Intel oneAPI to boost the performance
3. Training the model using [SVM](https://en.wikipedia.org/wiki/Support_vector_machine#:~:text=In%20machine%20learning%2C%20support%20vector,for%20classification%20and%20regression%20analysis.)
4. Predicting on training data
5. Predicting on testing data and analysing the accuracy
6. Saving the model

### The Web

1. Loading the model in Flask
2. Providing clean UI using Bootstrap
3. Using routes for renering HTML and handling middleware
4. Predicting on new data using the ML model
5. Hosting it on [Render](https://render.com/)
