# Digital-Bulletin-Board Flask-Backend

## This branch contains the Flask-backend for DBB application.

To run this application, configure the Database URL variable that is present in the **.env** file.

Note, this app uses SQLaclhemy to connect to a PostgreSQL database.

Configure the environmental variable found in **.env** file to connect to your local database. The value of the file is of form:

    DATABASE_URL=postgresql://<DB username>:<DB password>@localhost:<DB Port>/<DB name>

Please **change** this URL value to your configuration before proceeding with running the application

Feel free to change the JWT_SECRET_KEY value in the same file. This value determines the JWT key. The current value is a sample value and should not be used in **production**

At last, to **run** the app, run the **app.py** file, which creates the Database and populates it with sample data used to simply **demonstrate** its capabilities

### Current functionality
- Sign up
- Login
- Browse available Tasks
- Contribute to a specific Task
- Create task (For "Organization" type users only)
- Delete a specific task (For "Organization" type users only)