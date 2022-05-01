import sqlalchemy.orm as _orm
import database as _database
from fastapi import APIRouter,Depends,Request,responses,status
from fastapi.templating import Jinja2Templates

from sqlalchemy.exc import IntegrityError

from services.user_service import UserService
from models.register_model import UserCreateForm
from schemas.user_schema import UserCreate


from services.user_service import UserService

templates = Jinja2Templates(directory="templates")
router = APIRouter()


@router.get("/")
async def register(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})


@router.post("/")
async def register(request: Request, db: _orm.Session = Depends(_database.get_db)):
    form = UserCreateForm(request)
    await form.load_data()
    if await form.is_valid():
        user = UserCreate(
            email=form.email, password=form.password
        )
        try:
            user = UserService.create_user(user=user, db=db)
            return responses.RedirectResponse(
                "/?msg=Successfully-Registered", status_code=status.HTTP_302_FOUND
            )  # default is post request, to use get request added status code 302
        except IntegrityError:
            form.__dict__.get("errors").append("Email already exists")
            return templates.TemplateResponse("register.html", form.__dict__)
    return templates.TemplateResponse("register.html", form.__dict__)
