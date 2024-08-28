from pydantic import BaseModel, EmailStr
from datetime import date

class ClienteBase(BaseModel):
    nome: str
    cpf: str
    data_nascimento: date
    email: EmailStr

class ClienteCreate(ClienteBase):
    pass  # Esta classe herda os atributos de ClienteBase

class ClienteUpdate(ClienteBase):
    pass  # Esta classe herda os atributos de ClienteBase

class Cliente(ClienteBase):
    id: int