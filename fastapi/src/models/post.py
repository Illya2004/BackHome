from sqlalchemy import Column, BigInteger, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Post(Base):
    __tablename__ = 'posts'

    id = Column(BigInteger, primary_key=True, index=True)
    title = Column(String(255))
    description = Column(String(255))
    creation_date = Column(BigInteger)
    lost_date = Column(BigInteger)
    location_name = Column(String(255))
    location_coords = Column(String(255))
    user_id = Column(BigInteger, ForeignKey('users.id'))

    user = relationship("User", back_populates="posts")


class PostLikes(Base):
    __tablename__ = 'post_likes'

    id = Column(BigInteger, primary_key=True, index=True)
    post_id = Column(BigInteger, ForeignKey('posts.id'))
    user_id = Column(BigInteger, ForeignKey('users.id'))
    user = relationship("User", foreign_keys=[user_id])
    post = relationship("Post", foreign_keys=[post_id])