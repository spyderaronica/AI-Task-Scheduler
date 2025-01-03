import os
import joblib
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression

# Get the absolute path to the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Define the models directory path
models_dir = os.path.join(current_dir, "../../models")

# Ensure the models directory exists
os.makedirs(models_dir, exist_ok=True)

# Training data
sample_tasks = [
    "urgent meeting with client",     # High priority
    "review quarterly financials",   # Medium priority
    "buy groceries",                 # Low priority
    "prepare presentation",          # Medium priority
    "submit expense reports",        # Medium priority
    "team outing",                   # Low priority
    "fix critical bug",              # High priority
    "clean up workspace",            # Low priority
    "prepare for exams",             # High priority
    "study for final exams",         # High priority
    "submit assignment",             # Medium priority
    "schedule doctor appointment",   # Medium priority
    "plan vacation itinerary",       # Low priority
]

sample_priorities = [
    "High",   # urgent meeting with client
    "Medium", # review quarterly financials
    "Low",    # buy groceries
    "Medium", # prepare presentation
    "Medium", # submit expense reports
    "Low",    # team outing
    "High",   # fix critical bug
    "Low",    # clean up workspace
    "High",   # prepare for exams
    "High",   # study for final exams
    "Medium", # submit assignment
    "Medium", # schedule doctor appointment
    "Low",    # plan vacation itinerary
]
# Train the model
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(sample_tasks)

model = LogisticRegression()
model.fit(X, sample_priorities)

# Save the model and vectorizer in the models directory
joblib.dump(model, os.path.join(models_dir, "task_priority_model.pkl"))
joblib.dump(vectorizer, os.path.join(models_dir, "vectorizer.pkl"))

print("Model and vectorizer saved successfully!")