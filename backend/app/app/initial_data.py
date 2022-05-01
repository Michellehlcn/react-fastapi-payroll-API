
import logging


from database import SessionLocal

#database setup
from database import Base, engine
from models.user_model import User
from models.trainer_model import Trainer
from models.form_model import Form
Base.metadata.create_all(bind=engine)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def init() -> None:
    db = SessionLocal()
    


def main() -> None:
    logger.info("Creating initial data")
    init()
    logger.info("Initial data created")


if __name__ == "__main__":
    main()