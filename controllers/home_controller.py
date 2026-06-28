from flask import Blueprint, render_template

from models.producto import Producto

home_bp = Blueprint("home", __name__)

@home_bp.route("/")
def inicio():

    productos = Producto.query.limit(4).all()

    return render_template(
        "home/index.html",
        productos=productos
    )