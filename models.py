from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from db import Base

class user(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50))
    password = Column(String(50), unique=True, index=True)
    workout = relationship("workout", back_populates="user")
    workout_progress = relationship("workout_progress", back_populates="user") 

class workout(Base):
    __tablename__ = 'workouts'
    workout_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    exersice_id = Column(Integer, ForeignKey("exersices.exersice_id"))
    user = relationship("user", back_populates="workout") 
    workout_progress = relationship("workout_progress", back_populates="workout") 
    exersice = relationship("exersice", back_populates="workout") 
    workout_exersice = relationship("workout_exersice", back_populates="workout") 

class exersice(Base):
    __tablename__ = 'exersices'
    exersice_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True)
    muscles = Column(String(50), unique=True)
    equipment = Column(String(50), unique=True)
    workout = relationship("workout", back_populates="exersice") 
    workout_exersice = relationship("workout_exersice", back_populates="exersice") 

class workout_exersice(Base):
    __tablename__ = 'workout_exersices'
    id = Column(Integer, primary_key=True, index=True)
    reps = Column(Integer)
    placement = Column(Integer, unique=True)
    workout_id = Column(Integer, ForeignKey("workouts.workout_id"))
    exersice_id = Column(Integer, ForeignKey("exersices.exersice_id"))
    workout = relationship("workout", back_populates="workout_exersice") 
    exersice = relationship("exersice", back_populates="workout_exersice") 

class workout_progress(Base):
    __tablename__ = 'workout_progress'
    progress_id = Column(Integer, primary_key=True, index=True)
    time_progress = Column(Integer)
    accomplished = Column(Boolean, default=False)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    workout_id = Column(Integer, ForeignKey("workouts.workout_id"))
    exersice_id = Column(Integer, ForeignKey("exersices.exersice_id"))
    user = relationship("user", back_populates="workout_progress") 
    workout = relationship("workout", back_populates="workout_progress") 
