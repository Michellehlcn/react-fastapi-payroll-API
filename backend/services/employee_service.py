from fastapi import HTTPException
import sqlalchemy.orm as _orm
from models.employee_model import Employee
from schemas.employee_schema import CreateEmployee, EmployeeOut
import schemas.user_schema as user_schema
import schemas.employee_schema as employee_schema
class EmployeeService:


    @staticmethod
    def create_employee(user: user_schema.User,data:CreateEmployee, db:_orm.Session):
        """create a new employee"""
        #email = db.query(Employee).filter(Employee.email_address==data.email_address).first()
        #if email:
            #raise HTTPException(status_code=400, detail='email taken!')

        
        # save to database
        record = Employee(**data.dict(), owner_id=user.id)
        db.add(record)
        db.commit()
        db.refresh(record)
        return employee_schema.EmployeeOut.from_orm(record)

    @staticmethod
    def read_employees(user: user_schema.User,db:_orm.Session):
        """return a list of all employees from the database """
        record = db.query(Employee).filter_by(owner_id=user.id)
        return list(map(EmployeeOut.from_orm, record))

    @staticmethod
    def read_employee_byID(employee_id:int, user: user_schema.User,db:_orm.Session):
        """return a employee that matches emplyee_id"""
        record = db.query(Employee).filter_by(owner_id=user.id).filter(Employee.id == employee_id).first()
        if not record:
            raise HTTPException(status_code=400, detail=f'No record with employee_id {employee_id}')

        return record

    @staticmethod
    def read_employee(employee_id:int, user: user_schema.User, db:_orm.Session):
        record = read_employee_byID(employee_id=employee_id, user= user, db=db)
        return employee_schema.EmployeeOut.from_orm(record)

    @staticmethod
    def update_employee_record(employee_id:int, data:CreateEmployee, user: user_schema.User, db:_orm.Session):
        """update employee record"""
        record = read_employee_byID(employee_id, user, db)
        record.first_name = data.first_name
        record.last_name = data.last_name
        record.email_address = data.email_address
        record.title = data.title
        record.primary_phone_number = data.primary_phone_number
        record.secondary_phone_number = data.secondary_phone_number
        record.date_last_updated = _dt.datetime.utcnow()

        db.commit()
        db.refresh(record)

        return employee_schema.EmployeeOut.from_orm(record)

    @staticmethod
    def deactivate_employee(employee_id:int, user: user_schema.User, db:_orm.Session):
        """deactivate an employee"""
        record = read_employee_byID(employee_id, user, db)
        if not record:
            raise HTTPException(status_code=400, detail='No record matches the id provided')
        # set the active status to false
        record.active = False
        db.commit()
        return record