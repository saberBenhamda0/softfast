FROM python:3.11-alpine

ENV settings=backend.settings

RUN apk update @@ apt add --no-cache \ 
    gcc \ 
    musl-dev \ 
    postgresql-dev \
    libffi-dev
#gcc is a c compiler
#help compiling c programes
#dev header for postgreSQL
#this allow a program an a lanquage to call a function in another language
COPY . /backend

WORKDIR /backend

RUN pip install -r requirement.txt

RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "-c", "gunicorn_config.py", "backend.wsgi:application"]