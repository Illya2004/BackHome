from typing import List, Optional, Dict
from pydantic import BaseModel



class PostModel(BaseModel):
    postId: int
    description: str
    location: str
    userId: int
    likeCount: Optional[int] = None


class PostModelNoLike(BaseModel):
    postId: int
    description: str
    location: str
    user: Dict[str, str]


class PostUpdate(BaseModel):
    description: Optional[str] = None
    location: Optional[str] = None


class UserPosts(BaseModel):
    count: int
    posts: List[PostModel]
