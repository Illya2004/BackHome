from typing import List, Optional, Dict
from pydantic import BaseModel


class PostModel(BaseModel):
    id: int
    title: str
    description: str
    location_name: str
    location_coords: str
    creationDate: str
    lostDate: str
    userId: int
    likeCount: Optional[int] = None


class PostModelNoLike(BaseModel):
    id: int
    title: str
    description: str
    location_name: str
    location_coords: str
    creationDate: str
    lostDate: str
    userId: int


class UserPosts(BaseModel):
    count: int
    posts: List[PostModel]
