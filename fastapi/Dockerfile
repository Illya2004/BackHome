FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

WORKDIR /app

COPY ./requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r ./requirements.txt

COPY . .