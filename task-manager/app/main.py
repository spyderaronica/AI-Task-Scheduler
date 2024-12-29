from fastapi import FastAPI
from app.database import engine
from app.models import Base
from app.routes import tasks

# Create the tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI()
app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}

# Include task routes
app.include_router(tasks.router, prefix="/api/v1", tags=["tasks"])

