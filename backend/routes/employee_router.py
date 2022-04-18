from fastapi import APIRouter, Depends
from typing import List
import sqlalchemy.orm as _orm

import schemas.user_schema as user_schema
import services.employee_service as employee_service
import schemas.employee_schema as employee_schema
import database as _database

import routes.user_router as user_router


router = APIRouter()

@router.post('',
summary="create new employee",
response_model=employee_schema.EmployeeOut,
response_description='the created employee'
)
async def create_employee(
    payload:employee_schema.CreateEmployee,
    db:_orm.Session = Depends(_database.get_db), 
    user: user_schema.User = Depends(user_router.get_current_user) ):
    return employee_service.EmployeeService.create_employee(user=user,data=payload,db=db)


@router.get('',
summary='return a list of all employees',
response_model = List[employee_schema.EmployeeOut],
response_description = "a list of all employees",
status_code=200
)
async def get_employees(db:_orm.Session = Depends(_database.get_db), user: user_schema.User = Depends(user_router.get_current_user) ):
    return employee_service.EmployeeService.read_employees(db=db, user=user)


@router.get('/{employee_id}',
summary='return a employee that matches the id',
response_model = employee_schema.EmployeeOut,
response_description = 'the employee'
)
async def employee_by_id(employee_id:int,db:_orm.Session = Depends(_database.get_db), user: user_schema.User = Depends(user_router.get_current_user) ):
    return employee_service.EmployeeService.read_employee(employee_id=employee_id, user=user, db=db)


@router.put('/{employee_id}',
summary="edit employee records",
response_model=employee_schema.EmployeeOut,
response_description='the created employee'
)
async def update_employee(employee_id:int, payload:employee_schema.CreateEmployee, db:_orm.Session=Depends(_database.get_db), user: user_schema.User = Depends(user_router.get_current_user)):
    employee_service.EmployeeService.update_employee_record(employee_id=employee_id,data=payload, user=user, db=db)
    return {"message", "Successfully updated"}


@router.delete('/{employee_id}',
summary="delete employee",
response_description='the created employee'
)

async def delete_employee(employee_id:int, db:_orm.Session=Depends(_database.get_db), user: user_schema.User = Depends(user_router.get_current_user)):
    employee_service.EmployeeService.deactivate_employee(employee_id=employee_id, user=user, db=db)
    return {"message": "Successfully deactivated"}
