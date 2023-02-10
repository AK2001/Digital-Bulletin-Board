import os
from dotenv import load_dotenv
from datetime import timedelta


class Config:
    # Load environmental variables
    load_dotenv()

    # Set up the Flask-JWT-Extended extension
    # Configure application to store JWTs in cookies
    JWT_TOKEN_LOCATION = ['cookies']

    # Only allow JWT cookies to be sent over https. In production, this
    # should likely be True
    JWT_COOKIE_SECURE = False

    # Set the secret key to sign the JWTs with
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")  # change to env variable
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=2)

    # configure the SQLite database, relative to the main instance folder
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
