FROM python:3.8-alpine
ENV PYTHONUNBUFFERED=1
ENV TZ=America/Santiago
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev
RUN DEBIAN_FRONTEND=noninteractive TZ=America/Santiago apk add tzdata
WORKDIR /django
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

RUN adduser -D user
RUN chown -R user:user /django
USER user
