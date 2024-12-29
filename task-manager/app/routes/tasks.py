from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas, models
from app.database import get_db
from app.notifications import publish_reminder

router = APIRouter()

@router.get("/tasks/", response_model=list[schemas.Task])
def read_tasks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_tasks(db, skip=skip, limit=limit)

@router.get("/tasks/{task_id}", response_model=schemas.Task)
def read_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.get_task(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.post("/tasks/", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    new_task = crud.create_task(db, task)
    if new_task.reminder_at:
        publish_reminder(new_task.id, new_task.reminder_at.isoformat())
    return new_task

@router.put("/tasks/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    updated_task = crud.update_task(db, task_id, task)
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    if updated_task.reminder_at:
        publish_reminder(updated_task.id, updated_task.reminder_at.isoformat())
    return updated_task

@router.delete("/tasks/{task_id}", response_model=schemas.Task)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    deleted_task = crud.delete_task(db, task_id)
    if not deleted_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return deleted_task

@router.post("/tasks/{task_id}/reminder", response_model=schemas.Task)
def set_reminder(task_id: int, reminder_at: datetime, db: Session = Depends(get_db)):
    task = crud.set_task_reminder(db, task_id, reminder_at)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

