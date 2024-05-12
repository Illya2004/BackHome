from typing import List, Optional, Dict
from pydantic import BaseModel


class PostModel(BaseModel):
    id: int
    title: str
    description: str
    locationCoords: str
    creationDate: str
    lostDate: str
    image: str
    user: Dict[str, str]
    likeCount: Optional[int] = None


class PostModelNoLike(BaseModel):
    id: int
    title: str
    description: str
    locationCoords: str
    creationDate: str
    lostDate: str
    image: str
    user: Dict[str, str]


class UserPosts(BaseModel):
    count: int
    posts: List[PostModel]
