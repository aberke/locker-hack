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

```

http://127.0.0.1:5000/

Frontend:
```
$ cd frontend
$ yarn start
```
http://127.0.0.1:3000/

To start backend:

either from frontend directory
```
$ yarn start-api
```
or from backend directory
```
$ flask run
```

## It is set up

http://127.0.0.1:3000/ is the front end and tunnels to the backend.
http://127.0.0.1:3000/api/asks

