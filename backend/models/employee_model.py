import database as _database
import datetime as _dt 
import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import passlib.hash as _hash 
from sqlalchemy.orm import relationship


class Employee(_database.Base):
    __tablename__ = 'employees'
    id = _sql.Column(_sql.Integer, primary_key=True)
    owner_id = _sql.Column(_sql.Integer, _sql.ForeignKey("users.id"))
    first_name = _sql.Column(_sql.String, nullable=False)
    last_name = _sql.Column(_sql.String, nullable=False)
    title = _sql.Column(_sql.String, nullable=False)
    primary_phone_number = _sql.Column(_sql.Integer, nullable=False)
    secondary_phone_number = _sql.Column(_sql.Integer, nullable=False, default="N/A")
    email_address = _sql.Column(_sql.String, nullable=False)
    
    
    date_created = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)
    date_last_updated = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)
    active = _sql.Column(_sql.Boolean, default=True, nullable=False)

    #salary_group = relationship('SalaryGroup', back_populates='employees')
    owner = _orm.relationship("User", back_populates="employees")

