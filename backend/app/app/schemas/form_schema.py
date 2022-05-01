from datetime import date
from typing import Optional

import datetime as _dt
import pydantic as _pydantic

# shared properties
class JobBase(_pydantic.BaseModel):
    subject: Optional[str] = None
    campus: Optional[str] = "Remote"
    day: Optional[str] = None
    am_pm_eve: Optional[str] = None
    time: Optional[str] = None
    course: Optional[str] = None
    group: Optional[str] = None
    zoom_id_for_trainer: Optional[str] = None
    zoom_password_for_trainer: Optional[str] = None
    zoom_link_for_students: Optional[str] = None
    campus_room_no_capacity: Optional[str] = None
    classrom_capacity: Optional[int] = None
    number_of_student: Optional[int] = None
    student_profile: Optional[str] = None
    class_size_utilization: Optional[str] = None
    unique_group: Optional[str] = None

# this will be used to validate data while creating a Job
class JobCreate(JobBase):
    pass

# this will be used to format the response to not to have id,owner_id etc
class ShowJob(JobBase):
    id: int
    owner_id: int
    date_created: _dt.datetime
    is_active: bool

    class Config:  # to convert non dict obj to json
        orm_mode = True
