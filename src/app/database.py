from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#DATABASE_URL = "mysql+pymysql://root:senha@localhost:3306/clientes"   # localmente o certo é esse 
#DATABASE_URL = "mysql+pymysql://admin:rds123123@database-2.c5wok8yoiz4e.us-east-1.rds.amazonaws.com:3306/clientes"

DATABASE_URL = "mysql+pymysql://root:senha123@src-db-1:3306/clientes"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()