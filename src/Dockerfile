# Usando a imagem oficial do Python como base
FROM python:3.12-slim

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Copiando o arquivo requirements.txt para o diretório de trabalho
COPY requirements.txt .

# Instalando as dependências listadas no requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiando todo o conteúdo do diretório atual para o diretório de trabalho no container
COPY . .

# Expondo a porta que a aplicação vai rodar
EXPOSE 8000

# Comando para rodar a aplicação usando uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]