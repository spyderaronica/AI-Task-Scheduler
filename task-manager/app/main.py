from fastapi import FastAPI
from app.database import engine
from app.models import Base
from app.routes.tasks import router as tasks_router
import uvicorn

# Create the tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}

# Include task routes
app.include_router(tasks_router, prefix="/api", tags=["Tasks"])

for route in app.routes:
    print(f"Path: {route.path}, Name: {route.name}, Methods: {route.methods}")
    print(route.path, route.name, route.methods)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
