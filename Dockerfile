
# See https://hub.docker.com/r/library/python/ for all supported Python
FROM python:3.6.5-alpine

LABEL Name=esameld Version=0.0.1
RUN echo a
COPY requirements.txt .
RUN python3 -m pip install -r requirements.txt

RUN mkdir /code
WORKDIR /app
# Adding static dirs and files
ADD manage.py /app
ADD EsameLD /app/EsameLD
ADD templates /app/templates
ADD static /app/static

# Adding apps
ADD login /app/login
ADD map /app/map
ADD drivers /app/drivers
ADD clients /app/clients
ADD travels /app/travels

ADD pageNotFound /app/pageNotFound

EXPOSE 8000
