import smtplib

from fastapi import APIRouter, Depends, HTTPException, Query
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from database import get_db
from src.dto.post import UserPosts, PostModelNoLike
from src.models.post import Post
from src.models.user import User
from src.services.post import get_user_posts
from src.services.user import get_current_user

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()


@router.get("/posts/user/", response_model=UserPosts)
async def get_user_posts_by_token(
    current_user_data: Post = Depends(get_user_posts),
    limit: int = Query(1, ge=1),
    page: int = Query(1, ge=1),
):
    offset = (page - 1) * limit
    posts, total_posts = current_user_data
    return {"posts": posts[offset:offset + limit], "count": total_posts}


@router.get("/posts/{post_id}")
async def get_post_by_id(post_id: int,
                             current_user: User = Depends(get_current_user),
                             db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")

    user = db.query(User).filter(User.id == post.user_id).first()

    user_data = {"name": user.name, "email": user.email, "phoneNumber": user.phone_number}


    post_model = PostModelNoLike(
        postId=post.id,
        description=post.description,
        location=post.location,
        user=user_data
    )

    return post_model