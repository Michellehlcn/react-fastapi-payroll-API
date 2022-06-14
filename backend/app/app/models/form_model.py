from typing import List,Optional
from fastapi import Request


import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import database as _database
import datetime as _dt 


class Form(_database.Base):
    __tablename__="form"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)

    subject = _sql.Column(_sql.String,nullable=False)
    campus = _sql.Column(_sql.String, nullable=False)
    day = _sql.Column(_sql.String, nullable=False)
    am_pm_eve = _sql.Column(_sql.String, nullable=False)
    time = _sql.Column(_sql.String, nullable=False)
    course = _sql.Column(_sql.String,nullable=False)
    group = _sql.Column(_sql.String, nullable=False)
    zoom_id_for_trainer =_sql.Column(_sql.String)
    zoom_password_for_trainer =_sql.Column(_sql.String)
    zoom_link_for_students =_sql.Column(_sql.String)
    campus_room_no_capacity =_sql.Column(_sql.String)
    classrom_capacity =_sql.Column(_sql.Integer)
    number_of_student =_sql.Column(_sql.Integer)
    student_profile =_sql.Column(_sql.String)
    class_size_utilization =_sql.Column(_sql.String)
    unique_group = _sql.Column(_sql.Boolean(), default=False)

    date_created = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)
    is_active = _sql.Column(_sql.Boolean(), default=False, nullable=False)
    owner_id = _sql.Column(_sql.Integer, _sql.ForeignKey("users.id"))

    owner = _orm.relationship("User", back_populates="form")

class JobCreateForm:
    def __init__(self, request: Request):
        self.request: Request = request
        self.errors: List = []
        self.title: Optional[str] = None
        self.time: Optional[str] = None
        self.subject: Optional[str] = None
        self.location: Optional[str] = None
        self.description: Optional[str] = None

    async def load_data(self):
        form = await self.request.form()
        self.title = form.get("title")
        self.time = form.get("time")
        self.subject = form.get("subject")
        self.location = form.get("location")
        self.description = form.get("description")

    def is_valid(self):
        if not self.title or not len(self.title) >= 4:
            self.errors.append("A valid title is required")
        if not self.time:
            self.errors.append("Valid hours is required ")
        if not self.subject or not len(self.subject) >= 5:
            self.errors.append("A valid subject is required")
        if not self.description or not len(self.description) >= 3:
            self.errors.append("Description too short")
        if not self.errors:
            return True
        return False