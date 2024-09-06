# Sistema de Cadastro de Clientes
## 📜 Descrição
Este projeto é um sistema de cadastro de clientes que permite realizar operações de CRUD (Criar, Ler, Atualizar e Deletar) e de buscar um cliente pelo nome e/ou CPF em uma base de dados. A aplicação foi desenvolvida utilizando `FastAPI` para o backend, com `SQLAlchemy` para interação com o banco de dados `MySQL`. O frontend foi implementado utilizando `HTML`, `CSS` e `JavaScript`, proporcionando uma interface web simples e intuitiva para os usuários.

O projeto é containerizado utilizando `Docker`, facilitando o deployment e a escalabilidade. Para a hospedagem na nuvem, a aplicação está sendo executada em uma instância `EC2` da AWS, enquanto o banco de dados MySQL está armazenado em um serviço `Amazon RDS`, garantindo alta disponibilidade e segurança dos dados.

## ✅ Tecnologias utilizadas
- FastAPI: Framework web moderno e de alto desempenho para a construção de APIs com Python.
- MySQL: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar as informações dos clientes.
- SQLAlchemy: ORM (Object-Relational Mapping) utilizado para a interação com o banco de dados MySQL.
- Docker: Plataforma para a construção, envio e execução de aplicações em containers, garantindo um ambiente de execução consistente.
- HTML, CSS, JavaScript: Tecnologias utilizadas para a criação da interface web do sistema.
- AWS EC2: Serviço de computação em nuvem utilizado para hospedar a aplicação.
- AWS RDS: Serviço de banco de dados gerenciado utilizado para hospedar o banco de dados MySQL.

<!-- ## 🧑‍💻 Como usar a Aplicação

**Para acesso a aplicação, copie o link abaixo e cole no navegador:**
```
http://3.19.239.23/
```
-->

## 💻 Como rodar a Aplicação Localmente
**Pré-requisitos** :  
-`Docker` e `Docker Compose`

- Entre na pasta do projeto
``` shell
cd src
```
- Execute o container Docker
``` shell
docker-compose up --build
```

## 🛠️ Deploy na AWS EC2~RDS (sem docker)

**Configurando banco no RDS:**

> [Tutorial: conectar uma instância do Amazon EC2 a um banco de dados do Amazon RDS](https://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/tutorial-connect-ec2-instance-to-rds-database.html)

```
sudo apt update
sudo apt install mysql-client-core-8.0
mysql -h XXXXX.XXXXX.us-east-XXX.rds.amazonaws.com -P 3306 -u admin -p
```
```
CREATE DATABASE clientes;
SHOW DATABASES;
```

**Deploy na EC2 e rodando a aplicação como um serviço:**

> Foi utilizado Ubuntu

> [How to deploy a FastAPI app to AWS EC2 server.](https://dev.to/nick_langat/how-to-deploy-a-fastapi-app-to-aws-ec2-server-46d4)

- Baixando o projeto e instalando dependências
  
```
git clone https://github.com/katfr/ProjetoFinalNuvem.git
sudo apt install python3-pip
sudo apt install python3.12-venv
cd ProjetoFinalNuvem/src/
python3 -m venv myenv
source myenv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app
```

- Configuração do gunicorn

```
source myenv/bin/activate
pip install gunicorn
```

```
sudo nano /etc/systemd/system/gunicorn.socket
```

```
[Unit]
Description=gunicorn socket

[Socket]
ListenStream=/run/gunicorn.sock

[Install]
WantedBy=sockets.target
```

```
sudo systemctl start gunicorn.socket
sudo systemctl enable gunicorn.socket
```

```
sudo nano /etc/systemd/system/gunicorn.service
```

```
[Unit]
Description=gunicorn daemon
Requires=gunicorn.socket
After=network.target

[Service]
User=ubuntu
Group=www-data

WorkingDirectory=/home/ubuntu/ProjetoFinalNuvem/src
ExecStart=/home/ubuntu/ProjetoFinalNuvem/src/myenv/bin/gunicorn \
          --access-logfile - \
          --workers 1 \
          --bind unix:/run/gunicorn.sock \
          --worker-class uvicorn.workers.UvicornWorker \
          app.main:app

[Install]
WantedBy=multi-user.target
```


```
sudo systemctl restart gunicorn.socket 
sudo systemctl restart gunicorn.service 
sudo systemctl daemon-reload

```

- Configuração do nginx

```
sudo apt install nginx
sudo service nginx start
```

```
sudo nano /etc/nginx/sites-enabled/fastapi_nginx 
```

```
server {
    listen 80;
    server_name <IP da sua EC2>;
    location / {
        proxy_pass http://unix:/run/gunicorn.sock;
#        proxy_pass http://127.0.0.1:8000/;
        proxy_set_header Host $host; # Forwarded host
        proxy_set_header X-Real-IP $remote_addr;
#        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#        proxy_redirect off;

    }
        # Rota para buscar cliente por CPF (11 dígitos)
    location ~ "^/clientes/(\?cpf=[0-9]{11})$" {
        proxy_pass http://unix:/run/gunicorn.sock/clientes/cpf/$1;
        # Encaminha para o backend correspondente
        # proxy_pass http://127.0.0.1:8000/clientes/cpf/$1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location ~ "^/clientes/(\?cpf=[^.]{1,250})$" {
        # Encaminha para o backend correspondente
        # proxy_pass http://127.0.0.1:8000/clientes/$1;
        proxy_pass http://unix:/run/gunicorn.sock/clientes/$1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```
sudo nginx -t
sudo systemctl restart nginx
```

## 👤 Autores
- [Katarina](https://github.com/katfr) 
- [Layra](https://github.com/Layravbf) 
- [Marco](https://github.com/lieko0) 
