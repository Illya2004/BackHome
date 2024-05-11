from typing import Optional, List
from pydantic import BaseModel, EmailStr


class UserModel(BaseModel):
    id: int
    name: str
    email: EmailStr
    phoneNumber: str
    role: str
    liked: Optional[List[int]] = None


class UserUpdate(BaseModel):
    name: Optional[str] = None
    phoneNumber: Optional[str] = None
    password: Optional[str] = None
    newPassword: Optional[str] = None


class UserForgotPassword(BaseModel):
    email: EmailStr
