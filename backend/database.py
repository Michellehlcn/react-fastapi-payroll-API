import sqlalchemy as _sql
import sqlalchemy.ext.declarative as _declarative
import sqlalchemy.orm as _orm

DATABASE_URL = "sqlite:///./database.db"

# core interface to the database
engine = _sql.create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# talk to the database
SessionLocal = _orm.sessionmaker(autocommit=False, autoflush=False, bind=engine)

# class to describe the database
Base = _declarative.declarative_base()

# dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

