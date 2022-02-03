# Cornershop

Docker
I had to build a new docker file and docker compose file. I had problems with the files provided. I guess that because I use Ubuntu (I could not solve the issues 
with the provided instructions)

$ sudo docker-compose build
$ docker-compose run --rm app python manage.py makemigrations
$ docker-compose run --rm app python manage.py migrate
$ docker-compose run --rm app python populate.py
$ docker-compose up

Enviroment variables
The only enviroment variable to include is the Slack app hock

Implementation
The employees receive on Slack the url to select the dish they want of those available for a particular day.
Since all the employees receive the same url for a particular day, I could not figure out how all receiving the same link, the 
lunch app can differenciate who clicks the url.
When the employees click on the provided link, they will have to log in, for the first time. After that, using local storage (using React) that saves
a provided token, they will not have to login again for a period.
