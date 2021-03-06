## Project Implementation 

### Features

- Token-based authentication
- Add snippets with Title, Author, Content, and Tag fields
- Like snippets
- Comment on snippets
- Remove snippets
- Sorting by certain filters (hot etc)
- Beautiful UI (snackbars)
- Localstorage persistence 
- Recommendation system (sort by recommendations)

Everything listed above works

## TA and Prof

Get the project either through `vagrant up` and navigating to `localhost:3001` or follow local development instructions.

Note that 'vagrant up' does not work on windoze due to [too-long paths](https://harvsworld.com/2015/how-to-fix-npm-install-errors-on-vagrant-on-windows-because-the-paths-are-too-long/).

What we have working:

The most up-to-date branch is the frontend branch. Look at it to see the working components listed below.

- Our Snippet recommendation system can be seen in server/api. The function
  takes as input all the Snippets (essentially posts) on the site and a user
  and compares the attributes of each post to the attributes the user liked.
  The top `n` posts (where n is input to the function) are returned.
- Our project wiki page can be viewed on GitLab. It provides info on reactJS
  and JS ES6, a technology we've all needed to learn in order to build the
  site.
- You can currently create, like, and delete snippets. These frontend actions
  are fully integrated with the backend sqlite (for now) db that supports the
  site. The frontend for the Snippet actions mentioned can be seen in
  `client/actions/snippets.js`. The backend can be seen in
  `server/api/snippet.py` and `server/models/models.py`.
- A general UX specification document has been completed. It is in the master
  branch, and is called snippetUI.txt.
- All group members have made multiple commits.
- Vagrant up works in production

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

## Misc

Drop and recreate tables:

```
python server/dropdb.py
````

Start server using production config:

```
env BOOKSNIPPTR_ENV="production" python server/entry.py
```

## Testing the API (out of date)

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
