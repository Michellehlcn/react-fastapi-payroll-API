import pydantic as _pydantic
from typing import List, Optional
import datetime as _dt

class BaseEmployee(_pydantic.BaseModel):
    
    first_name: str
    last_name: str
    title: str
    primary_phone_number: str
    secondary_phone_number: str
    email_address: str

class CreateEmployee(BaseEmployee):
    pass


class EmployeeOut(BaseEmployee):
    id: int
    owner_id: int
    date_created: _dt.datetime
    date_last_updated: _dt.datetime
    active: bool
    class Config:
        orm_mode = True



