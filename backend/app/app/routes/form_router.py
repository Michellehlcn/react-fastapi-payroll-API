from typing import List,Optional

from fastapi.security.utils import get_authorization_scheme_param
from fastapi import APIRouter,Depends,Request,responses,status

import fastapi as _fastapi
from fastapi.templating import Jinja2Templates
import sqlalchemy.orm as _orm

import database as _database

import models.user_model as user_model
import schemas.user_schema as user_schema
import routes.user_router as user_router
import models.form_model as form_model
import schemas.form_schema as form_schema
import services.form_service as form_service



#....


router = APIRouter()

#templates = Jinja2Templates(directory="templates")
    
'''@router.get("/")
async def home(request: Request, db: _orm.Session = _fastapi.Depends(_database.get_db), msg: str = None):
    #jobs = list_jobs(db=db)
    return templates.TemplateResponse(
        "homepage.html", {"request": request, "msg": msg}
    )'''
'''
@router.get("/details/{id}")
def timesheet_detail(id: int, request: _fastapi.Request, db:_orm.Session = _fastapi.Depends(_database.get_db)):
    job = form_service.FormService.retreive_job(id=id, db=db)
    return templates.TemplateResponse(
        "detail_timesheet.html", {"request": request, "job": job}
    )
'''
@router.get("/timesheets")
async def get_timesheets(db: _orm.Session = _fastapi.Depends(_database.get_db)):  
    return form_service.FormService.list_jobs(db=db)

@router.get("/my-timesheets", response_model=List[form_schema.ShowJob])
async def get_user_jobs(request: _fastapi.Request,
                         db: _orm.Session = _fastapi.Depends(_database.get_db)):
    token = request.cookies.get("access_token")
    scheme, param = get_authorization_scheme_param(
        token
    )  # scheme will hold "Bearer" and param will hold actual token value
    current_user:  user_schema.User=user_router.get_current_user_from_token(db=db,token=param)
    return form_service.FormService.get_user_jobs(user=current_user, db=db)


# @router.get("/post-a-timesheet/",response_model=form_schema.ShowJob)       
# def create_job(payload:form_schema.JobCreate, db: _orm.Session = _fastapi.Depends(_database.get_db)):
#     return templates.TemplateResponse("form_timesheet.html", {"request": request})


# @router.post("/post-a-timesheet/",
#             summary="create new timesheet", 
#             response_model=form_schema.ShowJob, 
#             response_description='the created timesheet')   
# async def create_job(
#        request: Request, 
#        db: _orm.Session = _fastapi.Depends(_database.get_db)):
#        #user: user_schema.User = _fastapi.Depends(user_router.get_current_user)):

#     form = form_model.JobCreateForm(request)
#     await form.load_data()
#     if form.is_valid():
#         try:
#             token = request.cookies.get("access_token")
#             scheme, param = get_authorization_scheme_param(
#                 token
#             )  # scheme will hold "Bearer" and param will hold actual token value
#             current_user:  user_schema.User=user_router.get_current_user_from_token(db=db,token=param)
#             job = form_schema.JobCreate(**form.__dict__)

#             job = form_service.FormService.create_new_job(job=job, db=db, user=current_user)
#             print(current_user)
#             return responses.RedirectResponse(
#                 f"/form/details/{job.id}", status_code=status.HTTP_302_FOUND
#             )
#         except Exception as e:
#             print(e)
#             form.__dict__.get("errors").append(
#                 "You might not be logged in, In case problem persists please contact us."
#             )
#             return templates.TemplateResponse("form_timesheet.html", form.__dict__)
#         #logger.debug('This is test')
#     return templates.TemplateResponse("form_timesheet.html", form.__dict__)

#Create Timesheet Form
@router.post("/post-a-timesheet",
            summary="create new timesheet", 
            response_model=form_schema.ShowJob, 
            response_description='the created timesheet')   
async def create_job(
        job: form_schema.JobCreate,
        user: user_schema.User = _fastapi.Depends(user_router.get_current_user),    
       db: _orm.Session = _fastapi.Depends(_database.get_db)):
    return form_service.FormService.create_new_job(user=user, db=db, job=job)


       

@router.get("/delete-timesheet")
def show_jobs_to_delete(request: _fastapi.Request, db:_orm.Session = _fastapi.Depends(_database.get_db)):
    jobs = form_service.FormService.list_jobs(db=db)
    return templates.TemplateResponse(
        "delete_timesheet.html", {"request": request, "jobs": jobs}
    )


@router.get("/search")
def search(
    request: _fastapi.Request, db:_orm.Session = _fastapi.Depends(_database.get_db), query: Optional[str] = None
):
    jobs = form_service.FormService.search_job(query, db=db)
    return templates.TemplateResponse(
        "homepage.html", {"request": request, "jobs": jobs}
    )
