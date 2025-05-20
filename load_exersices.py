import json
from sqlalchemy.orm import Session
from models import exersice
from db import SessionLocal

def load_exersices():
    db: Session = SessionLocal()
    with open('exersices.json', encoding='utf-8') as f:
        data = json.load(f)
    
    for item in data:
        exersice_db = exersice(**item)
        db.add(exersice_db)
    db.commit()
    db.close()
    print( "exersices loaded successfully!")

if __name__ == "__main__":
    load_exersices()