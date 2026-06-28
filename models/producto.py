from database.database import db

class Producto(db.Model):

    __tablename__ = "productos"

    id = db.Column(db.Integer, primary_key=True)

    nombre = db.Column(db.String(100), nullable=False)

    descripcion = db.Column(db.String(300))

    precio = db.Column(db.Float, nullable=False)

    imagen = db.Column(db.String(255))

    categoria = db.Column(db.String(50))

    stock = db.Column(db.Integer, default=0)

    def __repr__(self):
        return self.nombre