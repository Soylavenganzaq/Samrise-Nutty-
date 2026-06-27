from flask import Flask

from controllers.home_controller import home_bp
from controllers.productos_controller import productos_bp
from controllers.carrito_controller import carrito_bp

app = Flask(__name__)

app.register_blueprint(home_bp)
app.register_blueprint(productos_bp)
app.register_blueprint(carrito_bp)

if __name__ == "__main__":
    app.run(debug=True)