from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db
from schemas import ProgressCreate
from services import progress_service

router = APIRouter()

@router.post("/")
def add_progress(data: ProgressCreate, db: Session = Depends(get_db)):
    return progress_service.add_progress(data, db)