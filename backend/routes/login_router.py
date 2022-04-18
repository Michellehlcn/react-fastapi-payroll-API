from routes.user_router import generate_token
from fastapi import APIRouter,Depends,HTTPException,Request,responses,status
from fastapi.templating import Jinja2Templates

from models.login_model import LoginForm
import sqlalchemy.orm as _orm
import database as _database


templates = Jinja2Templates(directory="templates")
router = APIRouter()


@router.get("/")
def login(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})


@router.post("/")
async def login(request: Request, db: _orm.Session = Depends(_database.get_db)):
    form = LoginForm(request)
    await form.load_data()
    if await form.is_valid():
        try:
            form.__dict__.update(msg="Login Successful :)")

            response = templates.TemplateResponse("login.html", {"request": request})
            access_token = generate_token(response = response,form_data=form, db=db)
            response.set_cookie(
                            key="access_token", 
                            value=f"Bearer {access_token}", 
                            httponly=True)
            return responses.RedirectResponse(
                f"/form/post-a-timesheet/", status_code=status.HTTP_302_FOUND
            )
            
        except HTTPException:
            form.__dict__.update(msg="")
            form.__dict__.get("errors").append("Incorrect Email or Password")
            return templates.TemplateResponse("login.html", form.__dict__)
    return templates.TemplateResponse("login.html", form.__dict__)
