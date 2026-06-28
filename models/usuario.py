from database.database import db

class Usuario(db.Model):

    __tablename__ = "usuarios"

    id = db.Column(db.Integer, primary_key=True)

    nombre = db.Column(db.String(100), nullable=False)

    usuario = db.Column(db.String(50), unique=True, nullable=False)

    password = db.Column(db.String(255), nullable=False)