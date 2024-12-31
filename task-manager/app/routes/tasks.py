from pydantic import BaseModel
from fastapi import APIRouter
from app.ai_model import predict_task_priority  # Ensure correct import for the prediction logic

router = APIRouter()

# Task CRUD routes
@router.post("/tasks")
async def create_task(description: str, due_date: str = None):
    """
    Create a new task.
    """
    # Your logic for creating a task
    return {"message": "Task created successfully", "description": description, "due_date": due_date}


# Define a Pydantic model for the input
class TaskRequest(BaseModel):
    description: str

@router.post("/task-priority")
async def get_task_priority(request: TaskRequest):
    """
    Predict the priority of a task based on its description.
    """
    description = request.description  # Extract the description from the request
    priority = predict_task_priority(description)
    return {"priority": priority}

