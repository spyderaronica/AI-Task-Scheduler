from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://<aadyamanchanda03%40gmail.com>:<Tyrionlannister52>@localhost:5432/<task-manager-db>"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency for creating a session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
