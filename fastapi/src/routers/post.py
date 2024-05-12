from datetime import timedelta, datetime

from fastapi import APIRouter, Depends, HTTPException, Query, Path
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from database import get_db
from src.dto.post import UserPosts, PostModelNoLike
from src.models.post import Post, PostLikes
from src.models.user import User
from src.services.post import get_user_posts, format_timedelta, send_notification_email
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
                         db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")

    user = db.query(User).filter(User.id == post.user_id).first()

    user_data = {"name": user.name, "email": user.email, "phoneNumber": user.phone_number}

    formatted_lost_date = datetime.utcfromtimestamp(post.lost_date / 1000).strftime('%d.%m.%Y')

    creation_time = datetime.utcfromtimestamp(post.creation_date / 1000)
    time_difference = datetime.utcnow() - creation_time

    formatted_creation_time = format_timedelta(time_difference)

    post_model = PostModelNoLike(
        id=post.id,
        title=post.title,
        description=post.description,
        locationCoords=post.location_coords,
        creationDate=formatted_creation_time,
        lostDate=formatted_lost_date,
        image=post.image,
        user=user_data
    )

    return post_model



@router.delete("/posts/delete/{post_id}")
async def delete_user_post(
        post_id: int = Path(..., title="The ID of the post to delete"),
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    post = db.query(Post).filter(Post.id == post_id).first()

    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")

    if post.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="You are not the author of this post")

    db.query(PostLikes).filter(PostLikes.post_id == post_id).delete()

    db.delete(post)
    db.commit()

    return {"message": "Post deleted successfully"}


@router.post("/posts/help/{post_id}")
async def toggle_help_post(
    post_id: int = Path(..., title="The ID of the post to help"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    post = db.query(Post).filter(Post.id == post_id).first()
    if post:
        user = db.query(User).filter(User.id == post.user_id).first()
        if current_user.role == 'ROLE_VOLUNTEER':
            existing_like = db.query(PostLikes).filter(
                PostLikes.post_id == post_id,
                PostLikes.user_id == current_user.id
            ).first()

            if existing_like:
                db.delete(existing_like)
                db.commit()
                send_notification_email(user.email, current_user.name, current_user.phoneNumber, post.title, "like_removed")
                return {"message": "Help removed successfully"}
            else:
                like = PostLikes(post_id=post_id, user_id=current_user.id)
                db.add(like)
                db.commit()
                send_notification_email(user.email, current_user.name, current_user.phoneNumber, post.title, "like_added")
                return {"message": "Help added successfully"}
        else:
            raise HTTPException(status_code=403, detail="You are not a volunteer")
    else:
        raise HTTPException(status_code=404, detail="Post not found")