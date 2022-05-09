from fastapi import FastAPI, Form, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import AnyHttpUrl

from typing import List, Optional
import fastapi as _fastapi
import fastapi.security as _security
import sqlalchemy.orm as _orm


#database setup
from database import Base, engine
from models.user_model import User
from models.trainer_model import Trainer
from models.form_model import Form
Base.metadata.create_all(bind=engine)

# routes imports
from routes import (user_router, trainer_router, form_router)

import services.user_service as _services
import schemas.user_schema as _schemas

from pathlib import Path

#BASE_PATH = Path(__file__).resolve().parent
#TEMPLATES = Jinja2Templates(directory=str(BASE_PATH / "templates"))

app = FastAPI(
    title="Payroll API",
    description="",
    redoc_url='/',
    debug=True,
    )
'''BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:3000",
        "http://localhost:8000",  # type: ignore
        "https://react-fastapi-payroll.herokuapp.com"
    ]
BACKEND_CORS_ORIGIN_REGEX: Optional[
        str] = "https.*\.(netlify.app|herokuapp.com)"  # noqa: W605
if BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in BACKEND_CORS_ORIGINS],
        allow_origin_regex=BACKEND_CORS_ORIGIN_REGEX,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )'''
#origins = ["http://localhost:3000"]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
app.include_router(
    user_router.router,
    prefix='/api/users',
    tags=['Users Operations'],
    responses={200:{'description':'Ok'}, 201:{'description':'Created'}, 400:{'description':'Bad Request'}, 401:{'desription':'Unauthorized'}}
)

app.include_router(
    trainer_router.router,
    prefix='/api/trainers/profile',
    tags=['Trainers Operations'],
    responses={200:{'description':'Ok'}, 201:{'description':'Created'}, 400:{'description':'Bad Request'}, 401:{'desription':'Unauthorized'}}
)

app.include_router(
    form_router.router,
    prefix='/api/form',
    tags=['Form Operations'],
    responses={200:{'description':'Ok'}, 201:{'description':'Created'}, 400:{'description':'Bad Request'}, 401:{'desription':'Unauthorized'}}
)


@app.get("/api")
async def root():
    return {"message": "Payroll API Application"}
'''
@app.post("/login/")
async def login(username: str = Form(...), password: str = Form(...)):
    return {"username": username}'''

'''
@app.get("/employees/{employee_id}",response_model = Employee,status_code=status.HTTP_200_OK)
async def get_employees(employee_id: int, department: Department ,gender: str=None  ):
    print(employee_id)
    print(gender)
    print(department)
    return [
        {
            "id": 1,
            "name": "Bob"
        },
        {
            "id": 2,
            "name": "Michelle"
        }
    ]
@app.post("/employees", response_model = Employee, status_code = status.HTTP_201_CREATED)
async def create_employee(employee: Employee):
    if employee.id in [200,300,400]:
        raise HTTPException(status_code=400, detail="Not a valid employee id")
    print(employee)
    return employee'''

'''

@app.post("/api/users")
async def create_user(user: _schemas.UserCreate, db: _orm.Session = _fastapi.Depends(database.get_db)):
    db_user = await _services.get_user_by_email(email=user.email, db=db)
    if db_user:
        raise _fastapi.HTTPException(
            status_code=400,
            detail="User with that email already exists")
    user = await _services.create_user(user=user, db=db)
    return await _services.create_token(user=user)


@app.post("/api/token")
async def generate_token(form_data: _security.OAuth2PasswordRequestForm = _fastapi.Depends(), db: _orm.Session = _fastapi.Depends(_services.get_db)):
    user = await _services.authenticate_user(email=form_data.username, password=form_data.password, db=db)

    if not user:
        raise _fastapi.HTTPException(
            status_code=401, detail="Invalid Credentials")

    return await _services.create_token(user=user)


@app.get("/api/users/me", response_model=_schemas.User)
async def get_user(user: _schemas.User = _fastapi.Depends(_services.get_current_user)):
    return user


@app.post("/api/user-posts", response_model=_schemas.Post)
async def create_post(
    post: _schemas.PostCreate,
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db)
):
    return await _services.create_post(user=user, db=db, post=post)


@app.get("/api/my-posts", response_model=List[_schemas.Post])
async def get_user_posts(user: _schemas.User = _fastapi.Depends(_services.get_current_user),
                         db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.get_user_posts(user=user, db=db)'''
'''
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3000, log_level="debug")'''