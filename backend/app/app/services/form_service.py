from sqlalchemy import false
from models.form_model import Form
import schemas.form_schema as form_schema
import sqlalchemy.orm as _orm
import models.user_model as user_model
import schemas.user_schema as user_schema
from fastapi import HTTPException

class FormService:

    @staticmethod 
    def create_new_job(job: form_schema.JobCreate, db: _orm.Session, user: user_model.User):
        job_object = Form(**job.dict(),owner_id=user.id)
        db.add(job_object)
        db.commit()
        db.refresh(job_object)
        return form_schema.ShowJob.from_orm(job_object)

    @staticmethod 
    def get_user_jobs(user: user_schema.User, db: _orm.Session):
        jobs = db.query(Form).filter_by(owner_id=user.id)

        return list(map(form_schema.ShowJob.from_orm, jobs))

    @staticmethod 
    def retreive_job(id: int, db: _orm.Session):
        item = db.query(Form).filter(Form.id == id).first()
        if not item:
            raise HTTPException(status_code=400, detail=f'No record with form_id {id}')
        return item
    

    def list_jobs(db: _orm.Session):
        jobs = db.query(Form).all()
        return jobs


    def update_job_by_id(id: int, job: form_schema.JobCreate, db: _orm.Session, owner_id):
        existing_job = db.query(Form).filter(Form.id == id)
        if not existing_job.first():
            return 0
        job.__dict__.update(
            owner_id=owner_id
        )  # update dictionary with new key value of owner_id
        existing_job.update(job.__dict__)
        db.commit()
        return 1


    def delete_job_by_id(id: int, db: _orm.Session, owner_id):
        existing_job = db.query(Form).filter(Form.id == id)
        if not existing_job.first():
            return 0
        existing_job.delete(synchronize_session=False)
        db.commit()
        return 1


    def search_job(query: str, db: _orm.Session):
        jobs = db.query(Form).filter(Form.title.contains(query))
        return jobs
    
    @staticmethod
    async def activate_timesheet(id:int, db:_orm.Session):
        """activate a timesheet"""
        record = retreive_job(id,db)
        if not record:
            raise HTTPException(status_code=400, detail='No record matches the id provided')
        # set the active status to false
        record.is_active = True
        db.commit()
        return record

    @staticmethod
    async def deactivate_timesheet(id:int, db:_orm.Session):
        """Deactivate a timesheet"""
        record = retreive_job(id,db)
        if not record:
            raise HTTPException(status_code=400, detail='No record matches the id provided')
        # set the active status to false
        record.is_active = False
        db.commit()
        return record