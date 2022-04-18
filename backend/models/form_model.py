from typing import List,Optional
from fastapi import Request


import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import database as _database
import datetime as _dt 


class Form(_database.Base):
    __tablename__="form"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    title = _sql.Column(_sql.String, nullable=False)
    time = _sql.Column(_sql.String, nullable=False)
    subject = _sql.Column(_sql.String,nullable=False)
    location = _sql.Column(_sql.String, nullable=False)
    description = _sql.Column(_sql.String, nullable=False)
    date_created = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)
    is_active = _sql.Column(_sql.Boolean(), default=True, nullable=False)
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