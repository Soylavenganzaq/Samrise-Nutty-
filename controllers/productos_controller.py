from flask import Blueprint, render_template

productos_bp = Blueprint("productos", __name__)

productos = [

    {
        "nombre": "galletas de pene",
        "precio": 8000,
        "descripcion": "Galleta con chispas de chocolate",
        "imagen": "galleta1.jpeg"
    },

    {
        "nombre": "Brownie de panocha",
        "precio": 10000,
        "descripcion": "Sabor intenso a chocolate",
        "imagen": "galleta2.jpeg"
    },

    {
        "nombre": "gelatina de vulva",
        "precio": 12000,
        "descripcion": "Nuestra favorita",
        "imagen": "galleta3.jpeg"
    },

    {
        "nombre": "gelatina de vulva",
        "precio": 12000,
        "descripcion": "Nuestra favorita",
        "imagen": "galleta4.jpeg"
    }

]

@productos_bp.route("/catalogo")
def catalogo():

    return render_template(
        "productos/catalogo.html",
        productos=productos
    )