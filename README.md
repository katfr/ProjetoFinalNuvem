#

## COMO RODAR A APLICAÇÃO COM DOCKER

``` shell
cd src
```

``` shell
docker-compose up --build
```

## COMO RODAR A APLICAÇÃO SEM DOCKER, LOCALMENTE COM BANCO DE DADOS LOCAL

- Ativar o ambiente virtual

``` shell
cd src
```

``` shell
python -m venv myenv
```

Windows:

``` shell
myenv\Scripts\activate #windows
```

Linux:

``` shell
source myenv/bin/activate #linux
```

- Instalar as dependencias no ambiente virtual

``` shell
pip install -r requirements.txt
```

- Criar database no banco de dados

- Atualizar variável do banco de dados

- Rodar o projeto

```shell
uvicorn app.main:app
```

<br>
<br>
<br>



### Extra

#### DESENVOLVIMENTO

- Criar e ativar o ambiente virtual: `python -m venv myenv` e `myenv\Scripts\activate`

- Observar se o interpretador é o python da máquina virtual

- Primeiro, instale as bibliotecas necessárias:
`pip install fastapi uvicorn sqlalchemy psycopg2-binary`

- Testando

- Lista as bibliotecas instaladas no environment além das instaladas por padrão: `pip freeze --local`

- Cria um arquivo requirementes.txt com todas as bibliotecas instaladas nesse ambiente virtual: `pip freeze > requirements.txt`

------------------------------
#### MySQL

- Abrir terminal digitar para iniciar `mysql` e `mysql -u root -p`
- Digitar a senha e vai estar dentro do mysql>
- Dentro colocar pra criar a tabela clientes: `CREATE DATABASE clientes;`

- Mostrar as tabelas criadas: `SHOW DATABASES`

- No codigo `/src/app/database.py` colocar
`DATABASE_URL = "mysql+pymysql://root:senha@localhost:3306/clientes"`

---

#### Docker

- Usando docker compose: `cd src` e `docker-compose up --build`

- Rodando um Container só com MySQL usando Docker: `docker run --name meu-mysql -e MYSQL_ROOT_PASSWORD=senha123 -e MYSQL_DATABASE=clientes -p 3306:3306 -d mysql:8.0` 
- URL de exemplo referente ao container: `DATABASE_URL = "mysql+pymysql://root:senha123@127.0.0.1:3306/clientes"`
