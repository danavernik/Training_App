from sqlalchemy.orm import Session
from models import exersice

def get_all_exersices(db: Session):
    return db.query(exersice).all()

def get_exersice_by_id(exersice_id: int, db: Session):
    return db.query(exersice).filter(exersice.exersice_id == exersice_id).first()

def search_exersices(name: str, muscles: str, equipment: str, db: Session):
    query = db.query(exersice)
    if name:
        query = query.filter(exersice.name.ilike(f"%{name}%"))
    if muscles:
        query = query.filter(exersice.muscles.ilike(f"%{muscles}%"))
    if equipment:
        query = query.filter(exersice.equipment.ilike(f"%{equipment}%"))
    return query.all()