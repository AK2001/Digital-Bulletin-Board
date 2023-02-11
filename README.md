# Digital-Bulletin-Board Flask-Backend

## This branch contains the Flask-backend for DBB application.

To run this application, configure the Database URL variable that is present in the **.env** file.

Note, this app uses SQLaclhemy to connect to a Database, the current URL is **postgresql://postgres:dbbapp123@localhost:5400/postgres** , which is for connection to a PostgreSQL database. The generic URL is **postgresql://<Username>:<database password>@localhost:<PORT>/<database name>**. Please change this URL to your configuration.

At last, to **run** the app, run the **app.py** file, which both creates the Database connection and the tables required and defines the API routes.
