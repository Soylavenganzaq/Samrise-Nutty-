from flask import Blueprint, render_template

carrito_bp = Blueprint("carrito", __name__)

@carrito_bp.route("/carrito")
def carrito():
    return render_template("carrito/carrito.html")