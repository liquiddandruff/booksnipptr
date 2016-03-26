What we have working:

The most up-to-date branch is “frontend” branch. Look at it to see the working components listed below. `Vagrant up` is not yet working.

- Our Snippet recommendation system can be seen in server/api. The function takes as input all the Snippets (essentially posts) on the site and a user and compares the attributes of each post to the attributes the user liked. The top `n` posts (where n is input to the function) are returned.
- Our project wiki page can be viewed on GitLab. It provides info on reactJS, a technology we’ve all needed to learn in order to build the site.
- A user can create a Snippet, like a Snippet (which increments the Snippet like count and also updates the user’s “liked Snippet attributes” property), and delete a snippet they’ve posted. These frontend actions are fully integrated with the backend Postgres db that supports the site. The frontend for the Snippet actions mentioned can be seen in client/components/Snippet.jsx. The backend can be seen in server/api/snippet.py and server/models/models.py.
-The front end for the login page is finished, but it hasn’t yet been connected to the backend. View the frontend component  in client/components/login.jsx
-A general UX specification document has been completed. It is in the master branch, and is called snippetUI.txt.
-All group members have made multiple commits.
