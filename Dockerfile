
# See https://hub.docker.com/r/library/python/ for all supported Python
FROM python:3.6.5-alpine

LABEL Name=esameld Version=0.0.1
RUN echo a
COPY requirements.txt .
RUN python3 -m pip install -r requirements.txt

RUN mkdir /code
WORKDIR /app
ADD . /app

EXPOSE 8000
