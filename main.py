from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from db import SessionLocal
from models import user, workout, exersice, workout_exersice, workout_progress
import models as models, schemas as schemas, db as db
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from schemas import WorkoutExersiceCreate, WorkoutCreate, ExersicesInWorkout, ProgressCreate
from fastapi.staticfiles import StaticFiles


app=FastAPI() 

app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"],)
app.mount("/static", StaticFiles(directory="static"), name="static")


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

@app.get("/workouts/{workout_id}/exersices", response_model=list[ExersicesInWorkout]) #מחזיר את כל התרגילים ששייכים לאימון
def get_exercises_for_workout(workout_id: int, db: Session = Depends(get_db)):
    workout_exersices = (
        db.query(workout_exersice)
        .filter(workout_exersice.workout_id == workout_id).all())
    if not workout_exersices:
        raise HTTPException(status_code=404, detail="Workout not found or has no exercises")
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

@app.get("/workouts/{id}/perform/", response_model=ExersicesInWorkout) #מחזיר תרגיל מאימון לפי הסדר
def get_exercise_by_placement(id: int, placement: int, db: Session = Depends(get_db)):
    we = (
        db.query(workout_exersice)
        .filter(
            workout_exersice.workout_id == id,
            workout_exersice.placement == placement).first()
    )
    if not we:
        raise HTTPException(status_code=404, detail="Exercise not found")
    ex = db.query(exersice).filter(exersice.exersice_id == we.exersice_id).first()
    return {
        "id": ex.exersice_id,
        "name": ex.name,
        "reps": we.reps,
        "placement": we.placement,
        "gif_url": ex.gif_url
    }

@app.get("/exersices/{exersice_id}")#מחזיר אימון לפי מזהה
def read_exersices(exersices_id: int, db: Session = Depends(get_db)):
    exersice = db.query(exersice).filter(models.exersice.exersice_id == exersices_id).first()
    if not exersice:
        raise HTTPException(status_code=404, detail="exersice not found")
    return exersice

@app.post("/workouts") #מוסיף אימון חדש
def create_workout(workout_data: WorkoutCreate, db: Session = Depends(get_db)):
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

@app.post("/progress")#מוסיף רשומת ביצוע תרגיל
def add_progress(data: ProgressCreate, db: Session = Depends(get_db)):
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