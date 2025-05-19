from pydantic import BaseModel
from typing import List

class user(BaseModel):
    user_id: int
    username: str
    password: str

class workout(BaseModel):
    workout_id: int
    name: str
    user_id: int
    exersice_id: int

class exersice(BaseModel):
    exersice_id: int
    name: str
    muscles: List[str]
    equipment: str

class workout_exersice(BaseModel):
    id: int
    reps: int
    placement: int
    workout_id: int
    exersice_id: int

class workout_progress(BaseModel):
    progress_id: int
    time_progress: int
    accomplished: bool = False
    user_id: int
    workout_id: int
    exersice_id: int