# locker-hack
This simple system helps Amazon customers improve their privacy while providing for others in need. It leverages the Amazon Locker infrastructure  and allows users to anonymously request  items they need to be securely sent to a locker.  Other users can ‘purchase privacy’ by anonymously fulfilling these requests while adding noise to their Amazon purchase profile.


[Workshop on Obfuscation Poster](https://api.obfuscation.karls.computer/uploads/Lockers_and_Noise_Poster_a21Afe87956.pdf)



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

# automatic reload on code changes
$ export FLASK_DEBUG=1

$ FLASK_ENV=development flask run

```

http://127.0.0.1:5000/index

Frontend:
```
$ cd frontend
$ yarn start
```


