from sqlalchemy.orm import Session
from models import workout_progress
from schemas import ProgressCreate

def add_progress(data: ProgressCreate, db: Session):
    progress_db = workout_progress(
        time_progress=data.time_progress,
        accomplished=data.accomplished,
        user_id=data.user_id,
        workout_id=data.workout_id,
        exersice_id=data.exersice_id
    )
    db.add(progress_db)
    db.commit()
    db.refresh(progress_db)
    return progress_db