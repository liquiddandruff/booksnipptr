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

```bash
sudo apt-get install libpq-dev python-dev
```

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

Create database tables:

```
python server/initdb.py
```

Start frontend webpack server:

```
npm run start

```

Open another terminal and start the backend python server:

```
python server/entry.py

```

Access the app at:

```
localhost:3000/
```

## Testing the API

Make a new post

```
curl -X post localhost:5000/api/snippet -d "author=steven&content=random post content"
```

Like post with id 1
```
curl -X post localhost:5000/api/snippet/1/like

```

View posts
```
curl localhost:5000/api/snippet

```

## What do we have here?

- Simple Flask **API**, powered with [**Flask-RESTful**](https://flask-restful.readthedocs.org/en/0.3.3/), [**SQLAlchemy**](http://www.sqlalchemy.org/) and [**PostgreSQL**](http://www.postgresql.org/)
- **UI**, powered with [**React**](http://facebook.github.io/react/), [**Babel**](https://babeljs.io/), [**Webpack**](http://webpack.github.io/) and [**React Transform HMR**](https://github.com/gaearon/react-transform-hmr)

Scaffolded from [flask-react-boilerplate](https://github.com/alexkuz/flask-react-boilerplate)
