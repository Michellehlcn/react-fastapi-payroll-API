from fastapi import HTTPException
import sqlalchemy.orm as _orm
from models.trainer_model import Trainer
from schemas.trainer_schema import CreateTrainer, TrainerOut
import schemas.user_schema as user_schema
import schemas.trainer_schema as trainer_schema
class TrainerService:


    @staticmethod
    def create_trainer(user: user_schema.User,data:CreateTrainer, db:_orm.Session):
        """create a new employee"""
        #email = db.query(Employee).filter(Employee.email_address==data.email_address).first()
        #if email:
            #raise HTTPException(status_code=400, detail='email taken!')

        
        # save to database
        record = Trainer(**data.dict(), owner_id=user.id)
        db.add(record)
        db.commit()
        db.refresh(record)
        return trainer_schema.TrainerOut.from_orm(record)

    #For Admin Users Only
    @staticmethod
    def read_trainers(user: user_schema.User,db:_orm.Session):
        """return a list of all employees from the database """
        record = db.query(Trainer).filter_by(owner_id=user.id)
        return list(map(TrainerOut.from_orm, record))

    #For Trainer Users Only
    
    def read_trainer_byID( user: user_schema.User,db:_orm.Session):
        """return a trainer that matches trainer_id"""
        record = db.query(Trainer).filter_by(owner_id=user.id).first()
        if not record:
            raise HTTPException(status_code=400, detail=f'No record with trainer_id {trainer_id}')

        return record

    @staticmethod
    async def read_trainer(trainer_id:int, user: user_schema.User, db:_orm.Session):
        record = read_trainer_byID(trainer_id=trainer_id, user= user, db=db)
        return trainer_schema.TrainerOut.from_orm(record)

    @staticmethod
    async def update_trainer_record(trainer_id:int, data:CreateTrainer, user: user_schema.User, db:_orm.Session):
        """update trainer record"""
        record = read_trainer_byID(trainer_id, user, db)
        record.first_name = data.first_name
        record.last_name = data.last_name
        record.email_address = data.email_address
        record.title = data.title
        record.primary_phone_number = data.primary_phone_number
        record.secondary_phone_number = data.secondary_phone_number
        record.date_last_updated = _dt.datetime.utcnow()

        db.commit()
        db.refresh(record)

        return trainer_schema.TrainerOut.from_orm(record)

    @staticmethod
    async def deactivate_trainer(trainer_id:int, user: user_schema.User, db:_orm.Session):
        """deactivate an trainer"""
        record = read_trainer_byID(trainer_id, user, db)
        if not record:
            raise HTTPException(status_code=400, detail='No record matches the id provided')
        # set the active status to false
        record.active = False
        db.commit()
        return record