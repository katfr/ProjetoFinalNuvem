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

## 🧑‍💻 Como usar a Aplicação

**Para acesso a aplicação, copie o link abaixo e cole no navegador:**
```
http://3.19.239.23/
```

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

## 👤 Autores
- [Katarina](https://github.com/katfr) 
- [Layra](https://github.com/Layravbf) 
- [Marco](https://github.com/lieko0) 
