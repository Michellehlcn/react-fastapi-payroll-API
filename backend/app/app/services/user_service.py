from typing import List
import sqlalchemy.orm as _orm
import passlib.hash as _hash
import email_validator as _email_check
import fastapi as _fastapi
import database as _database

import models.user_model as user_model
import schemas.user_schema as user_schema
import routes.user_router as user_router



class UserService:

    @staticmethod
    def get_users(db:_orm.Session):
        """return a list of all users"""
        return db.query(user_model.User).all()

    @staticmethod
    def get_user(email: str):
        db:_orm.Session = _database.SessionLocal()
        user = db.query(user_model.User).filter(user_model.User.email == email).first()
        if not user:
            return None
        return user

    @staticmethod
    def get_user_by_email(email: str, db: _orm.Session):
        return db.query(user_model.User).filter(user_model.User.email == email).first()

    @staticmethod
    def create_user(user: user_schema.UserCreate, db: _orm.Session):

        try:
            valid = _email_check.validate_email(email=user.email)

            email = valid.email
        except _email_check.EmailNotValidError:
            raise _fastapi.HTTPException(status_code=404, detail="Please enter a valid email")

        user_obj = user_model.User(email=email, role= user.role,hashed_password=_hash.bcrypt.hash(user.password))

        db.add(user_obj)
        db.commit()
        db.refresh(user_obj)
        return user_obj

    # authenticate user
    def authenticate_user(email: str, password: str, db: _orm.Session = _fastapi.Depends(_database.get_db)):
        user = UserService.get_user_by_email(email=email, db=db)
        if not user:
            return False
        
        if not user.verify_password(password):
            return False

        return user

    # create post
    @staticmethod 
    def create_post(user: user_model.User, db: _orm.Session, post: user_schema.PostCreate):
        post = user_model.Post(**post.dict(), owner_id=user.id)
        db.add(post)
        db.commit()
        db.refresh(post)
        return user_schema.Post.from_orm(post)

    # get user posts
    @staticmethod
    def get_user_posts(user: user_schema.User, db: _orm.Session):
        posts = db.query(user_model.Post).filter_by(owner_id=user.id)

        return list(map(user_schema.Post.from_orm, posts))




from typing import Dict,Optional
from fastapi.openapi.models import OAuthFlows as OAuthFlowsModel
from fastapi.security import OAuth2
from fastapi.security.utils import get_authorization_scheme_param
            
class OAuth2PasswordBearerWithCookie(OAuth2):
    def __init__(
        self,
        tokenUrl: str,
        scheme_name: Optional[str] = None,
        scopes: Optional[Dict[str, str]] = None,
        auto_error: bool = True,
    ):
        if not scopes:
            scopes = {}
        flows = OAuthFlowsModel(password={"tokenUrl": tokenUrl, "scopes": scopes})
        super().__init__(flows=flows, scheme_name=scheme_name, auto_error=auto_error)

    async def __call__(self, request: _fastapi.Request) -> Optional[str]:
        authorization: str = request.cookies.get(
            "access_token"
        )  # changed to accept access token from httpOnly Cookie

        scheme, param = get_authorization_scheme_param(authorization)
        if not authorization or scheme.lower() != "bearer":
            if self.auto_error:
                raise _fastapi.HTTPException(
                    status_code=_fastapi.status.HTTP_401_UNAUTHORIZED,
                    detail="Not authenticated",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            else:
                return None
        return param

