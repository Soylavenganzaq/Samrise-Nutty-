from flask import Flask

from database.database import db

from controllers.home_controller import home_bp
from controllers.productos_controller import productos_bp
from controllers.carrito_controller import carrito_bp
from controllers.checkout_controller import checkout_bp

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tienda.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    from models.producto import Producto
    db.create_all()

app.register_blueprint(home_bp)
app.register_blueprint(productos_bp)
app.register_blueprint(carrito_bp)
app.register_blueprint(checkout_bp)

print(app.url_map)

if __name__ == "__main__":
    app.run(debug=True)