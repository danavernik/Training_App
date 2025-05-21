from fastapi import FastAPI, Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from db import SessionLocal
from models import user, workout, exersice, workout_exersice
import models as models, schemas as schemas, db as db
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from schemas import WorkoutExersiceCreate, WorkoutCreate


app=FastAPI()
router = APIRouter()

app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"],)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"hello":"world"}

@app.get("/workouts", response_model=List[schemas.workout]) #מחזיר את כל האימונים
def read_workouts(db: Session = Depends(get_db)):
    workouts = db.query(workout).all()
    return workouts

@app.get("/exersices", response_model=List[schemas.exersice]) #מחזיר את כל התרגילים
def read_exersices(db: Session = Depends(get_db)):
    exersices = db.query(exersice).all()
    return exersices
#@app.get("/workouts/{workout_id}")
#def read_workouts(workout_id: int, db: Session = Depends(get_db)):
#    workout = db.query(workout).filter(models.Workout.workout_id == workout_id).first()
#    if not workout:
#       raise HTTPException(status_code=404, detail="Workout not found")
#    return workout

@app.get("/workouts/{workout_id}")
def get_workout(workout_id: int, db: Session = Depends(get_db)):
    workout = db.query(workout).filter(workout.workout_id == workout_id).first()
    return {
        "name": workout.name,
        "exersices": [
            {
                "exersice name": we.exercise.name,
                "reps": we.reps,
                "placement": we.placement
            } for we in workout.workout_exercises
        ]
    }
@app.get("/exersices/{exersice_id}")#מחזיר אימון לפי מזהה
def read_exersices(exersices_id: int, db: Session = Depends(get_db)):
    exersice = db.query(exersice).filter(models.exersice.exersice_id == exersices_id).first()
    if not exersice:
        raise HTTPException(status_code=404, detail="exersice not found")
    return exersice

@app.post("/workout_exersices")#מוסיף תרגיל לאימון
def add_exersice_to_workout(data: WorkoutExersiceCreate, db: Session = Depends(get_db)):
    new_link = workout_exersice(
        workout_id=data.workout_id,
        exersice_id=data.exercise_id,
        reps=data.reps,
        placement=data.placement
    )
    db.add(new_link)
    db.commit()
    db.refresh(new_link)
    return new_link

@app.post("/workouts/", response_model=schemas.workout) #מוסיף אימון חדש
def create_workout(workout: WorkoutCreate, db: Session = Depends(get_db)):
    db_workout = models.workout(**workout.dict())
    db.add(db_workout)
    db.commit()
    db.refresh(db_workout)
    return db_workout

@app.post("/workouts/{workout_id}/add-exersice/{exersice_id}")
def link_exercise_to_workout(workout_id: int, exersice_id: int, db: Session = Depends(get_db)):
    workout = db.query(models.Workout).filter(models.Workout.workout_id == workout_id).first()
    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")
    exersice = db.query(models.exersice).filter(models.exersice.exersice_id == exersice_id).first()
    if not exersice:
        raise HTTPException(status_code=404, detail="exersice not found")
    if exersice in workout.exersices:
        return {"message": "exersice already linked to this workout."}

    workout.exersices.append(exersice)
    db.commit()

    return {"message": "exersice linked successfully", "workout_id": workout_id, "exersice_id": exersice_id}