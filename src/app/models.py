from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Cliente(Base):
    __tablename__ = 'clientes'
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)  # Especifique o comprimento aqui
    cpf = Column(String(11), unique=True, nullable=False)
    data_nascimento = Column(String(10), nullable=False)
    email = Column(String(255), unique=True, nullable=False)