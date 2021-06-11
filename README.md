# locker-hack
This simple system helps Amazon customers improve their privacy while providing for others in need. It leverages the Amazon Locker infrastructure  and allows users to anonymously request  items they need to be securely sent to a locker.  Other users can ‘purchase privacy’ by anonymously fulfilling these requests while adding noise to their Amazon purchase profile.


[Workshop on Obfuscation Poster](https://docs.google.com/presentation/d/1DY58HAHGyYpKlxFrMIPpR8vLTYD1IAxzyV8kDkAF40g/)



### Affiliates link

Let's extract money through Amazon affiliates  links

associates ID:
mutualsupply-20


# Development

## Requirements

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- Python 3


## Set up

Clone the repo...

```
$ source .env
```

Backend:

```
$ cd backend

# Set up virtual env and download the requirements

$ python3 -m venv venv

$ source venv/bin/activate

$ pip install -r requirements.txt

# set up database -- also do this when pulling in models changes
$ flask db upgrade

```



Frontend:
```
$ cd frontend
// also do yarn install when pulling in new changes
$ yarn install
```

## Run it
Once it is set up

Frontend:
```
$ yarn start
```
http://127.0.0.1:3000/

Backend:

either from frontend directory
```
$ yarn start-api
```
or from backend directory
```
$ flask run
```
http://127.0.0.1:5000/

http://127.0.0.1:3000/ is the front end and tunnels to the backend.
http://127.0.0.1:3000/api/asks


## Database


### Data Migrations

Alembic is used to handle data migrations. Any update to models must go with a data migration.

When commiting models change:

```
$ flask db migrate -m "message"
```
Review the automatically generated script in `migrations/`.

Update database to match the change (can also downgrade)

```
$ flask db upgrade
```
