from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from db import get_db
from schemas import WorkoutCreate, ExersicesInWorkout, workout
from services import workout_service

router = APIRouter()

@router.get("/", response_model=List[workout])
def get_all_workouts(db: Session = Depends(get_db)):
    return workout_service.get_all_workouts(db)

@router.get("/{workout_id}/exersices", response_model=List[ExersicesInWorkout])
def get_exersices_for_workout(workout_id: int, db: Session = Depends(get_db)):
    return workout_service.get_exersices_for_workout(workout_id, db)

@router.get("/{id}/perform/", response_model=ExersicesInWorkout)
def get_exersice_by_placement(id: int, placement: int, db: Session = Depends(get_db)):
    return workout_service.get_exersice_by_placement(id, placement, db)

@router.post("/")
def create_workout(workout_data: WorkoutCreate, db: Session = Depends(get_db)):
    return workout_service.create_workout(workout_data, db)

@router.get("/search")
def search_workouts(name: str = Query(None), db: Session = Depends(get_db)):
    return workout_service.search_workouts(name, db)