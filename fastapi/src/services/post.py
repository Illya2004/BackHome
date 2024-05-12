from datetime import datetime, timedelta

import jwt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import desc, func
from sqlalchemy.orm import Session, joinedload

from config import settings, mail_config
from database import get_db
from src.models.post import Post, PostLikes
from src.models.user import User

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import make_msgid


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def format_timedelta(td: timedelta) -> str:
    days = td.days
    hours, remainder = divmod(td.seconds, 3600)
    minutes, seconds = divmod(remainder, 60)

    if days:
        return f"{days} дн. тому"
    elif hours:
        return f"{hours} год. тому"
    elif minutes:
        return f"{minutes} хв. тому"
    else:
        return "Кілька секунд тому"


async def get_user_posts(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, settings.APP_SECRET_KEY, algorithms=["HS384"])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")

        user = db.query(User).filter(User.email == email).first()

        if user is None:
            raise HTTPException(status_code=401, detail="User not found")

        posts_query = (
            db.query(Post, func.count(PostLikes.post_id), User)
            .outerjoin(PostLikes, Post.id == PostLikes.post_id)
            .outerjoin(User, Post.user_id == User.id)
            .filter(Post.user_id == user.id if user.role == "ROLE_CREATOR" else PostLikes.user_id == user.id)
            .group_by(Post.id, Post.title, Post.description, Post.creation_date, Post.lost_date, Post.location_coords,
                      Post.user_id, User.id, User.name, User.email, User.phone_number, User.role)
            .order_by(desc(Post.creation_date))
            .all()
        )

        formatted_posts = []
        for post, likeCount, user in posts_query:
            formatted_lost_date = datetime.utcfromtimestamp(post.lost_date / 1000).strftime('%d.%m.%Y')

            creation_time = datetime.utcfromtimestamp(post.creation_date / 1000)
            time_difference = datetime.utcnow() - creation_time

            formatted_creation_time = format_timedelta(time_difference)

            user_data = {
                "name": user.name,
                "email": user.email,
                "phoneNumber": user.phone_number
            }

            formatted_post = {
                "id": post.id,
                "title": post.title,
                "description": post.description,
                "locationCoords": post.location_coords,
                "creationDate": formatted_creation_time,
                "lostDate": formatted_lost_date,
                "image": post.image,
                "user": user_data,
                "likeCount": likeCount
            }

            formatted_posts.append(formatted_post)

        total_posts = len(formatted_posts)

        return formatted_posts, total_posts
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")



def send_notification_email(receiver_email, user_name, phone_number, post_title, action):
    smtp_server = mail_config.SMTP_SERVER
    port = mail_config.SMTP_PORT
    email_address = mail_config.HOST_EMAIL
    password = mail_config.EMAIL_PASS

    try:
        server = smtplib.SMTP_SSL(smtp_server, port)
        server.login(email_address, password)

        msg = MIMEMultipart()
        msg['From'] = email_address
        msg['To'] = receiver_email
        msg['Subject'] = f'[{settings.DOMAIN_NAME}] Статус оголошення'

        if action == "like_added":
            html = f'''
                                <table style="Margin:0;background:#fff;border-collapse:collapse;border-spacing:0;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;height:100%;line-height:1.7;margin:0;padding:0;text-align:left;vertical-align:top;width:100%;display: flex;justify-content: flex-start;">
                         <tbody style="
                    "><tr style="padding:0;text-align:left;vertical-align:top">
                           <td style="Margin:0;border-collapse:collapse!important;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">

                            <table align="center" style="Margin:0 auto;background:#fff;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:580px"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td style="Margin:0;border-collapse:collapse!important;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                              <table style="border-collapse:collapse;border-spacing:0;display:center;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:center;vertical-align:top">

                               <th style="Margin:0 auto;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0 auto;padding:0;padding-left:6px;padding-top:16px;padding-right:8px;text-align:center;width:274px"></th>

                                 </tr></tbody></table>
                                 <table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td height="20px" style="Margin:0;border-collapse:collapse!important;color:#344a5e;font-family:Tahoma,sans-serif;font-size:20px;font-weight:400;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;
                                 <table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top">
                                   <tbody>
                                     <tr style="padding:0;text-align:left;vertical-align:top">
                                       <td style="Margin:0;border-collapse:collapse!important;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;padding:0;padding-left:0;text-align:left;vertical-align:top;word-wrap:break-word"><span class="im">

                                        <h1 style="Margin:0;Margin-bottom:0;color:inherit;font-family:Tahoma,sans-serif;font-size:25px;font-weight:700;line-height:1.5;margin:0;margin-bottom:0;padding:0;text-align:left;padding-left:22px;padding-right:16px;padding-left:22px;padding-right:16px;color: #344a5e;word-wrap:normal">На ваше оголошення відгукнулися!</h1>
                                           <table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td height="20px" style="Margin:0;border-collapse:collapse!important;color:#344a5e;font-family:Tahoma,sans-serif;font-size:20px;font-weight:400;line-height:20px;margin:0;padding:0;padding-left:16px;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;</td></tr></tbody></table>

                                           <p style="Margin:0;Margin-bottom:10px;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;margin-bottom:10px;padding:0;text-align:left;padding-left:22px;padding-right:16px">
                                                Відгукнувся:</p>
                                              </span><ul>
                                                  <li><b>Ім'я :</b> {user_name}</li><span class="im">
                                                  <li><b>Номер телефону:</b> {phone_number}</li><span class="im">
                                                  <li><b>Опис оголошення:</b> {post_title}</li><span class="im">
                                                  <small style="
                                                        color: #344a5e;
                                                    ">найближчим часом з вами зв'яжуться</small>
                                                  </span></ul>
                                           <table style="border-collapse:collapse;border-spacing:0;display:table;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top">
                                              <th style="Margin:0 auto;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0 auto;padding:0;padding-bottom:16px;padding-left:22px;padding-right:8px;text-align:left;width:129px"><table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><th style="Margin:0;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;padding:0;text-align:left">
                                                <table style="Margin:0 0 16px 0;border-collapse:collapse;border-spacing:0;margin:0 0 16px;padding:0;text-align:left;vertical-align:top;width:auto!important"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td style="Margin:0;border-collapse:collapse!important;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word"><table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td style="Margin:0;background:0 0;border:1px solid transparent;border-collapse:collapse!important;color:#fff;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">


                                                  <a href="https://{settings.DOMAIN_NAME}/" style="Margin:0;background-color:#0050EA!important;border-radius:.5rem;color:#fff!important;display:inline-block;font-family:Tahoma,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0;padding:7px 37px!important;text-align:left;text-decoration:none;text-transform:normal;white-space:nowrap!important" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://{settings.DOMAIN_NAME}/&amp;source=gmail&amp;ust=1714396499627000&amp;usg=AOvVaw37TWKSV1IxJ38NLvd8eTQG" jslog="32272; 1:WyIjdGhyZWFkLWY6MTc5NzU3ODU5NjEwMjcwMjc4MiJd; 4:WyIjbXNnLWY6MTc5NzU4NDM4MTIyMzE5NDEwOCJd">Перейти на сайт</a>

                                                </td></tr></tbody></table></td></tr></tbody></table></th></tr></tbody></table></th><th style="Margin:0 auto;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0 auto;padding:0;padding-bottom:16px;padding-left:22px;padding-right:10px;text-align:left;width:370px"><table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><th style="Margin:0;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;padding:0;text-align:left">
                                                </th></tr></tbody></table></th></tr></tbody></table>
                                 <table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td height="20px" style="Margin:0;border-collapse:collapse!important;color:#344a5e;font-family:Tahoma,sans-serif;font-size:20px;font-weight:400;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;</td></tr></tbody></table>
                                 <table style="border-collapse:collapse;border-spacing:0;display:table;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top">
                                   <th style="Margin:0 auto;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0 auto;padding:0;padding-bottom:16px;padding-left:16px;padding-right:22px;text-align:left;width:564px"><table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><th style="Margin:0;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;padding:0;text-align:left"></th>
                                    <th style="Margin:0;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;padding:0!important;text-align:left;width:0"></th></tr></tbody></table></th>
                                 </tr></tbody></table>
                               </td></tr></tbody></table>
                           </td>
                         </tr>
                       </tbody></table>
                    </td></tr></tbody></table></td></tr></tbody></table>
                            '''
        elif action == "like_removed":
            html = f'''
                                            <table style="Margin:0;background:#fff;border-collapse:collapse;border-spacing:0;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;height:100%;line-height:1.7;margin:0;padding:0;text-align:left;vertical-align:top;width:100%;display: flex;justify-content: flex-start;">
                                     <tbody style="
                                "><tr style="padding:0;text-align:left;vertical-align:top">
                                       <td style="Margin:0;border-collapse:collapse!important;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">

                                        <table align="center" style="Margin:0 auto;background:#fff;border-collapse:collapse;border-spacing:0;float:none;margin:0 auto;padding:0;text-align:center;vertical-align:top;width:580px"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td style="Margin:0;border-collapse:collapse!important;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">
                                          <table style="border-collapse:collapse;border-spacing:0;display:center;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:center;vertical-align:top">

                                           <th style="Margin:0 auto;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0 auto;padding:0;padding-left:6px;padding-top:16px;padding-right:8px;text-align:center;width:274px"></th>

                                             </tr></tbody></table>
                                             <table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td height="20px" style="Margin:0;border-collapse:collapse!important;color:#344a5e;font-family:Tahoma,sans-serif;font-size:20px;font-weight:400;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;
                                             <table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top">
                                               <tbody>
                                                 <tr style="padding:0;text-align:left;vertical-align:top">
                                                   <td style="Margin:0;border-collapse:collapse!important;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;padding:0;padding-left:0;text-align:left;vertical-align:top;word-wrap:break-word"><span class="im">

                                                    <h1 style="Margin:0;Margin-bottom:0;color:inherit;font-family:Tahoma,sans-serif;font-size:25px;font-weight:700;line-height:1.5;margin:0;margin-bottom:0;padding:0;text-align:left;padding-left:22px;padding-right:16px;padding-left:22px;padding-right:16px;color: #344a5e;word-wrap:normal">Отакої!</h1>
                                                       <table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td height="20px" style="Margin:0;border-collapse:collapse!important;color:#344a5e;font-family:Tahoma,sans-serif;font-size:20px;font-weight:400;line-height:20px;margin:0;padding:0;padding-left:16px;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;</td></tr></tbody></table>

                                                       <p style="Margin:0;Margin-bottom:10px;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;margin-bottom:10px;padding:0;text-align:left;padding-left:22px;padding-right:16px">
                                                            {user_name} на жаль не зможе допомогти вам з пошуками :(</p>
                                                          </span><ul>
                                                             <li><b>Короткий опис оголошення:</b> {post_title}</li><span class="im"><br>
                                                              Не переживайте, вам обов'язково допоможуть пізніше ^_^<span class="im">
                                                              </span></ul>
                                                       <table style="border-collapse:collapse;border-spacing:0;display:table;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top">
                                                          <th style="Margin:0 auto;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0 auto;padding:0;padding-bottom:16px;padding-left:22px;padding-right:8px;text-align:left;width:129px"><table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><th style="Margin:0;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;padding:0;text-align:left">
                                                            <table style="Margin:0 0 16px 0;border-collapse:collapse;border-spacing:0;margin:0 0 16px;padding:0;text-align:left;vertical-align:top;width:auto!important"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td style="Margin:0;border-collapse:collapse!important;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word"><table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td style="Margin:0;background:0 0;border:1px solid transparent;border-collapse:collapse!important;color:#fff;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">


                                                              <a href="https://{settings.DOMAIN_NAME}/" style="Margin:0;background-color:#0050EA!important;border-radius:.5rem;color:#fff!important;display:inline-block;font-family:Tahoma,sans-serif;font-size:16px;font-weight:400;line-height:1.5;margin:0;padding:7px 37px!important;text-align:left;text-decoration:none;text-transform:normal;white-space:nowrap!important" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://{settings.DOMAIN_NAME}/&amp;source=gmail&amp;ust=1714396499627000&amp;usg=AOvVaw37TWKSV1IxJ38NLvd8eTQG" jslog="32272; 1:WyIjdGhyZWFkLWY6MTc5NzU3ODU5NjEwMjcwMjc4MiJd; 4:WyIjbXNnLWY6MTc5NzU4NDM4MTIyMzE5NDEwOCJd">Перейти на сайт</a>

                                                            </td></tr></tbody></table></td></tr></tbody></table></th></tr></tbody></table></th><th style="Margin:0 auto;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0 auto;padding:0;padding-bottom:16px;padding-left:22px;padding-right:10px;text-align:left;width:370px"><table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><th style="Margin:0;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;padding:0;text-align:left">
                                                            </th></tr></tbody></table></th></tr></tbody></table>
                                             <table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><td height="20px" style="Margin:0;border-collapse:collapse!important;color:#344a5e;font-family:Tahoma,sans-serif;font-size:20px;font-weight:400;line-height:20px;margin:0;padding:0;text-align:left;vertical-align:top;word-wrap:break-word">&nbsp;</td></tr></tbody></table>
                                             <table style="border-collapse:collapse;border-spacing:0;display:table;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top">
                                               <th style="Margin:0 auto;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0 auto;padding:0;padding-bottom:16px;padding-left:16px;padding-right:22px;text-align:left;width:564px"><table style="border-collapse:collapse;border-spacing:0;padding:0;text-align:left;vertical-align:top;width:100%"><tbody><tr style="padding:0;text-align:left;vertical-align:top"><th style="Margin:0;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;padding:0;text-align:left"></th>
                                                <th style="Margin:0;color:#344a5e;font-family:Tahoma,sans-serif;font-size:14px;font-weight:400;line-height:1.7;margin:0;padding:0!important;text-align:left;width:0"></th></tr></tbody></table></th>
                                             </tr></tbody></table>
                                           </td></tr></tbody></table>
                                       </td>
                                     </tr>
                                   </tbody></table>
                                </td></tr></tbody></table></td></tr></tbody></table>
                                        '''


        msg.attach(MIMEText(html, 'html'))

        server.send_message(msg)
        server.quit()
    except smtplib.SMTPException as e:
        raise e





