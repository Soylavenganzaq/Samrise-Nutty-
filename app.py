from flask import Flask

from database.database import db

from controllers.home_controller import home_bp
from controllers.productos_controller import productos_bp
from controllers.carrito_controller import carrito_bp
from controllers.checkout_controller import checkout_bp
from controllers.admin_controller import admin_bp

app = Flask(__name__)

# Clave secreta para sesiones
app.secret_key = "samrise_secret_2026"

# Configuración de la base de datos
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tienda.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Inicializar SQLAlchemy
db.init_app(app)

# Crear tablas
with app.app_context():
    from models.producto import Producto
    from models.usuario import Usuario

    db.create_all()

# Registrar Blueprints
app.register_blueprint(home_bp)
app.register_blueprint(productos_bp)
app.register_blueprint(carrito_bp)
app.register_blueprint(checkout_bp)
app.register_blueprint(admin_bp)

# Solo para pruebas (luego puedes eliminarlo)
print(app.url_map)

# Ejecutar la aplicación
if __name__ == "__main__":
    app.run(debug=True)