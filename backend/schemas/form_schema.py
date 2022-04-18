from datetime import date
from typing import Optional

import datetime as _dt
import pydantic as _pydantic

# shared properties
class JobBase(_pydantic.BaseModel):
    title: Optional[str] = None
    time: Optional[str] = None
    subject: Optional[str] = None
    location: Optional[str] = "Remote"
    description: Optional[str] = None

# this will be used to validate data while creating a Job
class JobCreate(JobBase):
    pass

# this will be used to format the response to not to have id,owner_id etc
class ShowJob(JobBase):
    id: int
    owner_id: int
    date_created: _dt.datetime

    class Config:  # to convert non dict obj to json
        orm_mode = True
