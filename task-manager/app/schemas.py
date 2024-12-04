from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: Optional[str] = "medium"

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    is_complete: Optional[bool] = False

class Task(TaskBase):
    id: int
    is_complete: bool
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True
