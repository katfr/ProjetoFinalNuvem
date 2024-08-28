## COMO RODAR 
- Ativar o ambiente virtual
```
cd src
```
```
python -m venv myenv
```
```
myenv\Scripts\activate
```

- Instalar as dependencias no ambiente virtual
```
pip install -r requirements.txt
```

- Rodar o projeto 
```
uvicorn app.main:app
```

<br>
<br>
<br>

- DESENVOLVIMENTO

python -m venv myenv
myenv\Scripts\activate

- Observar se o interpretador é o python da máquina virtual

- Primeiro, instale as bibliotecas necessárias:
pip install fastapi uvicorn sqlalchemy psycopg2-binary

- Testando 

- Lista as bibliotecas instaladas no environment além das instaladas por padrão
`pip freeze --local`

- Cria um arquivo requirementes.txt com todas as bibliotecas instaladas nesse ambiente virtual
`pip freeze > requirements.txt`



------------------------------
MySQL

- Abrir terminal digitar para iniciar mysql 
mysql -u root -p

- Digitar a senha e vai estar dentro do mysql>
- Dentro colocar pra criar a tabela clientes
CREATE DATABASE clientes;

- Mostrar as tabelas criadas 
SHOW DATABASES

- No codigo colocar 
DATABASE_URL = "mysql+pymysql://root:senha@localhost:3306/clientes"