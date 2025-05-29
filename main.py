from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routers import workout_router, exersice_router, progress_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(workout_router.router, prefix="/workouts", tags=["Workouts"])
app.include_router(exersice_router.router, prefix="/exersices", tags=["Exersices"])
app.include_router(progress_router.router, prefix="/progress", tags=["Progress"])

@app.get("/")
def root():
    return {"hello": "world"}