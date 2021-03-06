
# See https://hub.docker.com/r/library/python/ for all supported Python
FROM python:3.6.6-jessie

LABEL Name=esameld Version=0.0.1

COPY requirements.txt .
RUN PATH=/usr/local/mysql/bin/:$PATH
RUN apt-get install libmysqlclient-dev;
RUN python3 -m pip install -r requirements.txt

RUN mkdir /code
WORKDIR /app
# Adding static dirs and files
ADD docker-startup.sh /app
ADD manage.py /app
ADD EsameLD /app/EsameLD
ADD templates /app/templates
ADD static /app/static

# Adding apps
ADD administrator /app/administrator
ADD authentication /app/authentication
ADD map /app/map
ADD drivers /app/drivers
ADD clients /app/clients
ADD travels /app/travels

ADD pageNotFound /app/pageNotFound

EXPOSE 8000
