from flask import Blueprint, render_template

productos_bp = Blueprint("productos", __name__)

productos = [

    {
        "nombre":"Chocolate Chips",
        "precio":8000,
        "descripcion":"Galleta con chispas de chocolate",
        "imagen":"galleta1.jpg"
    },

    {
        "nombre":"Brownie Cookie",
        "precio":10000,
        "descripcion":"Sabor intenso a chocolate",
        "imagen":"galleta2.jpg"
    },

    {
        "nombre":"Red Velvet",
        "precio":12000,
        "descripcion":"Nuestra favorita",
        "imagen":"galleta3.jpg"
    }

]

@productos_bp.route("/catalogo")
def catalogo():

    return render_template(
        "productos/catalogo.html",
        productos=productos
    )