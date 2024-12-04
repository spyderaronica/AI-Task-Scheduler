from fastapi import FastAPI
from app.database import engine
from app.models import Base
from app.routes import tasks

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI()

# Include the task routes
app.include_router(tasks.router, prefix="/api/v1", tags=["tasks"])
