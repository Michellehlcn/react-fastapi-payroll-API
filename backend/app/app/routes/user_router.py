from fastapi import APIRouter,Depends,Request,responses,status
from typing import List, Optional
from datetime import datetime, timedelta
import os as _os

import dotenv as _dotenv
import jwt as _jwt
from jose import JWTError
import sqlalchemy.orm as _orm
from passlib.context import CryptContext

import fastapi as _fastapi
import fastapi.security as _security

import database as _database
import schemas.user_schema as _schemas
import models.user_model as _models
from services.user_service import UserService, OAuth2PasswordBearerWithCookie
import pydantic as _pydantic

router = APIRouter()

_dotenv.load_dotenv()
# JWT CONFIGURATIONS
#_JWT_SECRET = _os.environ['JWT_SECRET']
_JWT_SECRET = 'password123'
oauth2schema = _security.OAuth2PasswordBearer("api/users/token")
ACCESS_TOKEN_EXPIRE_MINUTES = 90


oauth2_scheme = OAuth2PasswordBearerWithCookie(tokenUrl="api/users/token")

class Token(_pydantic.BaseModel):
    access_token: str
    token_type: str
class TokenData(_pydantic.BaseModel):
    email: Optional[str] = None



# create access token
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode.update({"exp": expire})
    encoded_jwt = _jwt.encode(
        to_encode, _JWT_SECRET, "HS256"
    )
    return encoded_jwt


def create_token(user: _models.User):
    user_obj = _schemas.User.from_orm(user)

    user_dict = user_obj.dict()
    del user_dict["date_created"]

    token = _jwt.encode(user_dict, _JWT_SECRET)
    #return token

    return dict(access_token=token, token_type="bearer")


# create get user dependency
def get_current_user(db: _orm.Session = _fastapi.Depends(_database.get_db), token: str = _fastapi.Depends(oauth2schema)):

    try:
        payload = _jwt.decode(token, _JWT_SECRET, algorithms=["HS256"])
        user = db.query(_models.User).get(payload["id"])
    
    except:
        raise _fastapi.HTTPException(
            status_code=401, detail="Invalid Email or Password"
        )
    print(_schemas.User.from_orm(user))
    return _schemas.User.from_orm(user)


#Register
@router.post("")
async def create_user(user: _schemas.UserCreate, db: _orm.Session = _fastapi.Depends(_database.get_db)):
    db_user = UserService.get_user_by_email(email=user.email, db=db)
    if db_user:
        raise _fastapi.HTTPException(
            status_code=400,
            detail="Email already in use")
    user = UserService.create_user(user=user, db=db)
    return create_token(user=user)

'''
#login
@router.post("/token",response_model=Token)
async def generate_token(
    response: _fastapi.Response,  
    form_data: _security.OAuth2PasswordRequestForm = _fastapi.Depends(), 
    db: _orm.Session = _fastapi.Depends(_database.get_db)):
    user = authenticate_user(email=form_data.username, password=form_data.password, db=db)

    if not user:
        raise _fastapi.HTTPException(
            status_code=401, detail="Incorrect email or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires)
    response.set_cookie(
        key="access_token", value=f"Bearer {access_token}", httponly=True
    )
    #return create_token(user=user)
    return {"access_token": access_token, "token_type": "bearer"}'''


def get_current_user_from_token(
    token: str = _fastapi.Depends(oauth2_scheme), db: _orm.Session = _fastapi.Depends(_database.get_db)
):
    credentials_exception = _fastapi.HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        payload = _jwt.decode(
            token, _JWT_SECRET, algorithms=["HS256"]
        )
        email: str = payload.get("sub")
        print("email extracted is ", email)
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = UserService.get_user(email=email)
    if user is None:
        raise credentials_exception
    return user


@router.post("/token")
async def generate_token(
    form_data: _security.OAuth2PasswordRequestForm = _fastapi.Depends(),
    db: _orm.Session = _fastapi.Depends(_database.get_db),
):
    user = UserService.authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise _fastapi.HTTPException(status_code=401, detail="Invalid Credentials")

    return create_token(user)

@router.get("/me", response_model=_schemas.User)
async def get_user(user: _schemas.User = _fastapi.Depends(get_current_user)):
    return user

def verify_role(required_role: List, user: _schemas.User = _fastapi.Depends(get_current_user)):
    if user.role not in required_role:
        raise HTTPException(status_code=403, detail="Operation not permitted")
    else:
        return user

@router.get("/admin", response_model=_schemas.User)
async def get_user(user: _schemas.User = _fastapi.Depends(get_current_user)):
    # Check Manager role
    user = verify_role(required_role=['manager'],user = user)
    return user



#Super user role
class RoleChecker:
    def __init__(self, allowed_roles: List):
        self.allowed_roles = allowed_roles

    def __call__(self, user: _schemas.User = _fastapi.Depends(get_current_user)):
        if user.role not in self.allowed_roles:
            logger.debug(f"User with role {user.role} not in {self.allowed_roles}")
            raise HTTPException(status_code=403, detail="Operation not permitted")

#Super user role
allow_create_resource = RoleChecker(["admin","manager"])









