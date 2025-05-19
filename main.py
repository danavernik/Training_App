from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from db import SessionLocal
from models import user, workout, exersice
from . import models, schemas, db

app=FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"hello":"world"}

@app.get("/workouts", response_model=schemas.workout)
def read_workouts(db: Session = Depends(get_db)):
    workouts = db.query(workout).all()
    return workouts

@app.get("/workouts/{workout_id}")
def read_workouts(workout_id: int, db: Session = Depends(get_db)):
    workout = db.query(workout).filter(models.Workout.workout_id == workout_id).first()
    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")
    return workout

@app.get("/exersices/{exersice_id}")
def read_exersices(exersices_id: int, db: Session = Depends(get_db)):
    exersice = db.query(exersice).filter(models.exersice.exersice_id == exersices_id).first()
    if not exersice:
        raise HTTPException(status_code=404, detail="exersice not found")
    return exersice

@app.post("/workouts/", response_model=schemas.workout)
def create_workout(workout: schemas.workout, db: Session = Depends(get_db)):
    db_workout = models.Workout(**workout.dict())
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