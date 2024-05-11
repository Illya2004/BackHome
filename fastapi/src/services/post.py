import jwt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import desc, func
from sqlalchemy.orm import Session

from config import settings
from database import get_db
from src.models.post import Post, PostLikes
from src.models.user import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_user_posts(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, settings.APP_SECRET_KEY, algorithms=["HS384"])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")

        user = db.query(User).filter(User.email == email).first()

        if user is None:
            raise HTTPException(status_code=401, detail="User not found")

        posts = (
            db.query(Post, func.count(PostLikes.post_id))
            .outerjoin(PostLikes, Post.id == PostLikes.post_id)
            .filter(Post.user_id == user.id if user.role == "ROLE_CREATOR" else PostLikes.user_id == user.id)
            .order_by(desc(Post.creation_time))
            .all()
        )

        posts_dict = {}
        for post, likeCount in posts:
            if post.id not in posts_dict:
                posts_dict[post.id] = {
                    "postId": post.id,
                    "description": post.description,
                    "location": post.location,
                    "userId": post.user_id,
                    "likeCount": likeCount
                }

        formatted_posts = list(posts_dict.values())

        total_posts = len(formatted_posts)

        return formatted_posts, total_posts
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")