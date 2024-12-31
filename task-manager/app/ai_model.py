import joblib
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression


# Load the pre-trained model and vectorizer
model = joblib.load("app/models/task_priority_model.pkl")
vectorizer = joblib.load("app/models/vectorizer.pkl")

def predict_task_priority(description: str) -> str:
    """
    Predict the priority of a task based on its description.
    :param description: Task description.
    :return: Predicted priority as a string.
    """
    features = vectorizer.transform([description])
    return model.predict(features)[0]
