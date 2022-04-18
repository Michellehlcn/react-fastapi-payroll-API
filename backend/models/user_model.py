import datetime as _dt 


import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import passlib.hash as _hash 

import database as _database

class User(_database.Base):
	__tablename__="users"
	id = _sql.Column(_sql.Integer, primary_key =True, index=True)
	email = _sql.Column(_sql.String, unique=True, index=True)
	first_name = _sql.Column(_sql.String)
	last_name = _sql.Column(_sql.String)
	hashed_password = _sql.Column(_sql.String, nullable=False)
	date_created = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)
	active = _sql.Column(_sql.Boolean, default=True, nullable=False)
	#is_verified Bool
	role = _sql.Column(_sql.String)
	
	posts = _orm.relationship("Post", back_populates="owner")
	form = _orm.relationship("Form", back_populates="owner")
	employees = _orm.relationship("Employee", back_populates="owner")
	def verify_password(self, password: str):
		return _hash.bcrypt.verify(password, self.hashed_password)

class Post(_database.Base):
	__tablename__="posts"
	id = _sql.Column(_sql.Integer, primary_key=True, index=True)
	owner_id = _sql.Column(_sql.Integer, _sql.ForeignKey("users.id"))
	post_text = _sql.Column(_sql.String, index=True)
	date_created = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)

	owner = _orm.relationship("User", back_populates="posts")



