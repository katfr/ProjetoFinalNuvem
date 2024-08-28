'''
from fastapi import FastAPI

app = FastAPI()

@app.get('/')
async def msg():
    return{"msg": "FastAPI funcionando"}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, log_level="info", reload=True)
'''

from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine, get_db

from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles


models.Cliente.metadata.create_all(bind=engine)

app = FastAPI()

# Adicionado templates para o front-end
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

'''
app.get('/')
async def msg():
    return{"msg": "FastAPI funcionando"}
'''

# Endpoint para Criar novo cliente
@app.post("/clientes/", response_model=schemas.Cliente)
def create_cliente(cliente: schemas.ClienteCreate, db: Session = Depends(get_db)):
    return crud.create_cliente(db=db, cliente=cliente)

# Endpoint para Listar todos os clientes
@app.get("/clientes/", response_model=list[schemas.Cliente])
def read_clientes(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_clientes(db, skip=skip, limit=limit)

# Endpoint para Retornar o cliente pelo ID
@app.get("/clientes/{cliente_id}", response_model=schemas.Cliente)
def read_cliente(cliente_id: int, db: Session = Depends(get_db)):
    db_cliente = crud.get_cliente(db, cliente_id=cliente_id)
    if db_cliente is None:
        raise HTTPException(status_code=404, detail="ID do Cliente não encontrado")
    return db_cliente

# Endpoint para buscar cliente pelo CPF
@app.get("/clientes/cpf/{cpf}", response_model=schemas.Cliente)
def read_cliente_by_cpf(cpf: str, db: Session = Depends(get_db)):
    db_cliente = crud.get_cliente_by_cpf(db, cpf=cpf)
    if db_cliente is None:
        raise HTTPException(status_code=404, detail="Cpf do Cliente não encontrado")
    return db_cliente

# Endpoint para atualizar cliente pelo id
@app.put("/clientes/{cliente_id}", response_model=schemas.Cliente)
def update_cliente(cliente_id: int, cliente: schemas.ClienteCreate, db: Session = Depends(get_db)):
    return crud.update_cliente(db=db, cliente_id=cliente_id, cliente=cliente)

# Endpoint para atualizar excluir cliente pelo id
@app.delete("/clientes/{cliente_id}")
def delete_cliente(cliente_id: int, db: Session = Depends(get_db)):
    db_cliente = crud.delete_cliente(db, cliente_id=cliente_id)
    if db_cliente is None:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    return {"message": "Cliente deletado com sucesso"}
    