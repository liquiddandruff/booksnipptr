## Vagrant

```
vagrant up
open localhost:3001
```

## Local Development


Prerequisites:

- Pip (https://pip.pypa.io/en/latest/installing.html)
- PostgreSQL (http://www.postgresql.org/download/)
- NPM (https://docs.npmjs.com/getting-started/installing-node)

Clone repository:

```
git clone git@csil-git1.cs.surrey.sfu.ca:sha152/book-snippetr.git

cd book-snippetr
```

Install npm dependencies:

```
npm install
```

Setup python environment and install dependencies:

```
virtualenv venv

source venv/bin/activate

pip install -r requirements.txt
```

Copy `.env.example` config file to `.env`:

```
cp .env.example .env
```

Start PostgreSQL service if needed:

```
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
```

Create database tables:

```
python server/initdb.py
```

Finally, start local server:

```
npm run start
```
Open another terminal and run:

```
python server/entry.py
```
Access the website at:
```
localhost:3000/
```
## What do we have here?

- Simple Flask **API**, powered with [**Flask-RESTful**](https://flask-restful.readthedocs.org/en/0.3.3/), [**SQLAlchemy**](http://www.sqlalchemy.org/) and [**PostgreSQL**](http://www.postgresql.org/)
- **UI**, powered with [**React**](http://facebook.github.io/react/), [**Babel**](https://babeljs.io/), [**Webpack**](http://webpack.github.io/) and [**React Transform HMR**](https://github.com/gaearon/react-transform-hmr)

Scaffolded from [flask-react-boilerplate](https://github.com/alexkuz/flask-react-boilerplate)
