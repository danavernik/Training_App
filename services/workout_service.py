from sqlalchemy.orm import Session
from models import workout, exersice, workout_exersice
from schemas import WorkoutCreate

def get_all_workouts(db: Session):
    return db.query(workout).all()

def get_exersices_for_workout(workout_id: int, db: Session):
    workout_exersices = db.query(workout_exersice).filter(workout_exersice.workout_id == workout_id).all()
    if not workout_exersices:
        raise Exception("Workout not found or has no exercises")
    results = []
    for we in workout_exersices:
        exersice_db = db.query(exersice).filter(exersice.exersice_id == we.exersice_id).first()
        results.append({
            "id": exersice_db.exersice_id,
            "name": exersice_db.name,
            "reps": we.reps,
            "placement": we.placement,
            "gif_url": exersice_db.gif_url
        })
    return results

def get_exersice_by_placement(id: int, placement: int, db: Session):
    we = db.query(workout_exersice).filter(
        workout_exersice.workout_id == id,
        workout_exersice.placement == placement).first()
    if not we:
        raise Exception("Exercise not found")
    ex = db.query(exersice).filter(exersice.exersice_id == we.exersice_id).first()
    return {
        "id": ex.exersice_id,
        "name": ex.name,
        "reps": we.reps,
        "placement": we.placement,
        "gif_url": ex.gif_url
    }

def create_workout(workout_data: WorkoutCreate, db: Session):
    workout_db = workout(name=workout_data.name, user_id=1)
    db.add(workout_db)
    db.flush()
    for idx, ex in enumerate(workout_data.workout_exersices):
        we = workout_exersice(
            workout_id=workout_db.workout_id,
            exersice_id=ex.exersice_id,
            reps=ex.reps,
            placement=idx + 1
        )
        db.add(we)
    db.commit()

def search_workouts(name: str, db: Session):
    query = db.query(workout)
    if name:
        query = query.filter(workout.name.ilike(f"%{name}%"))
    return query.all()