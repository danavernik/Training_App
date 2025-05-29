from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db import get_db
from schemas import exersice as ExersiceSchema
from services import exersice_service

router = APIRouter()

@router.get("/", response_model=List[ExersiceSchema])
def read_exersices(db: Session = Depends(get_db)):
    return exersice_service.get_all_exersices(db)

@router.get("/{exersice_id}", response_model=ExersiceSchema)
def read_exersice_by_id(exersice_id: int, db: Session = Depends(get_db)):
    ex = exersice_service.get_exersice_by_id(exersice_id, db)
    if not ex:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return ex

@router.get("/search")
def search_exersices(
    name: str = Query(None), 
    muscles: str = Query(None), 
    equipment: str = Query(None), 
    db: Session = Depends(get_db)
):
    return exersice_service.search_exersices(name, muscles, equipment, db)