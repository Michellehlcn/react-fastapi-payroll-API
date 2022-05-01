from fastapi import APIRouter, Depends
from typing import List
import sqlalchemy.orm as _orm

import schemas.user_schema as user_schema
import services.trainer_service as trainer_service
import schemas.trainer_schema as trainer_schema
import database as _database

import routes.user_router as user_router


router = APIRouter()

@router.post('',
summary="create new trainer",
response_model=trainer_schema.TrainerOut,
response_description='the created trainer'
)
async def create_trainer(
    payload:trainer_schema.CreateTrainer,
    db:_orm.Session = Depends(_database.get_db), 
    user: user_schema.User = Depends(user_router.get_current_user) ):
    return trainer_service.TrainerService.create_trainer(user=user,data=payload,db=db)

#For Admin Users Only
@router.get('',
summary='return a list of all trainer',
response_model = List[trainer_schema.TrainerOut],
response_description = "a list of all Trainers",
status_code=200
)
async def get_trainers(db:_orm.Session = Depends(_database.get_db), user: user_schema.User = Depends(user_router.get_current_user) ):
    return trainer_service.TrainerService.read_trainers(db=db, user=user)

#For Trainer Users Only
@router.get('/',
summary='return a trainer that matches the id',
response_model = trainer_schema.TrainerOut,
response_description = 'the trainer'
)
async def trainer_by_id(db:_orm.Session = Depends(_database.get_db), user: user_schema.User = Depends(user_router.get_current_user) ):
    return trainer_service.TrainerService.read_trainer_byID( user=user, db=db)


@router.put('/{trainer_id}',
summary="edit trainer records",
response_model=trainer_schema.TrainerOut,
response_description='the created trainer'
)
async def update_trainer(trainer_id:int, payload:trainer_schema.CreateTrainer, db:_orm.Session=Depends(_database.get_db), user: user_schema.User = Depends(user_router.get_current_user)):
    trainer_service.TrainerService.update_trainer_record(trainer_id=trainer_id,data=payload, user=user, db=db)
    return {"message", "Successfully updated"}


@router.delete('/{trainer_id}',
summary="delete trainer",
response_description='the created trainer'
)

async def delete_trainer(trainer_id:int, db:_orm.Session=Depends(_database.get_db), user: user_schema.User = Depends(user_router.get_current_user)):
    trainer_service.TrainerService.deactivate_trainer(trainer_id=trainer_id, user=user, db=db)
    return {"message": "Successfully deactivated"}
