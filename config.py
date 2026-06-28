import os

class Config:

    SECRET_KEY = "samrise_secret_2026"

    SQLALCHEMY_DATABASE_URI = "sqlite:///tienda.db"

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    MAIL_SERVER = "smtp.gmail.com"

    MAIL_PORT = 587

    MAIL_USE_TLS = True

    MAIL_USERNAME = ""

    MAIL_PASSWORD = ""

    MAIL_DEFAULT_SENDER = ""