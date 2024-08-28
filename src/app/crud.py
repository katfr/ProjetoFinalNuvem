from fastapi import HTTPException
from sqlalchemy.orm import Session
from . import models, schemas

def get_cliente(db: Session, cliente_id: int):
    return db.query(models.Cliente).filter(models.Cliente.id == cliente_id).first()

def get_cliente_by_cpf(db: Session, cpf: str):
    return db.query(models.Cliente).filter(models.Cliente.cpf == cpf).first()

def get_clientes(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Cliente).offset(skip).limit(limit).all()

def create_cliente(db: Session, cliente: schemas.ClienteCreate):
    db_cliente = models.Cliente(**cliente.model_dump())
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente

def update_cliente(db: Session, cliente_id: int, cliente: schemas.ClienteCreate):
    db_cliente = db.query(models.Cliente).filter(models.Cliente.id == cliente_id).first()

    if db_cliente is None:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")

    for key, value in cliente.model_dump().items():
        setattr(db_cliente, key, value)

    db.commit()
    db.refresh(db_cliente)

    print(db_cliente)  # Adicione esta linha para depurar o objeto retornado

    return db_cliente

def delete_cliente(db: Session, cliente_id: int):
    db_cliente = db.query(models.Cliente).filter(models.Cliente.id == cliente_id).first()
    if db_cliente:
        db.delete(db_cliente)
        db.commit()
    return db_cliente