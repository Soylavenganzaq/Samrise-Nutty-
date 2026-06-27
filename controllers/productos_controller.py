from flask import Blueprint, render_template

productos_bp = Blueprint("productos", __name__)

@productos_bp.route("/catalogo")
def catalogo():
    return render_template("productos/catalogo.html")