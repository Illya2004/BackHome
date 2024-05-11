from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from src.routers import user, post
from config import settings

Base.metadata.create_all(engine)

app = FastAPI(root_path="/v2")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


SECRET_KEY = settings.APP_SECRET_KEY

app.include_router(user.router, tags=["user-controller"])
app.include_router(post.router, tags=["user-posts-controller"])

