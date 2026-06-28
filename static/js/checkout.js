function enviarPedido(){

    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;
    const direccion = document.getElementById("direccion").value;
    const ciudad = document.getElementById("ciudad").value;
    const observaciones = document.getElementById("observaciones").value;

    const metodo = document.querySelector(
        'input[name="pago"]:checked'
    ).value;

    if(nombre=="" || telefono=="" || direccion=="" || ciudad==""){

        alert("Por favor complete todos los campos obligatorios.");

        return;

    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if(carrito.length==0){

        alert("Tu carrito está vacío.");

        return;

    }

    let mensaje = "🍪 *NUEVO PEDIDO* %0A%0A";

    mensaje += "*Cliente:* " + nombre + "%0A";
    mensaje += "*Teléfono:* " + telefono + "%0A";
    mensaje += "*Correo:* " + correo + "%0A";
    mensaje += "*Dirección:* " + direccion + "%0A";
    mensaje += "*Ciudad:* " + ciudad + "%0A";
    mensaje += "*Pago:* " + metodo + "%0A%0A";

    mensaje += "*PRODUCTOS*%0A";

    let total = 0;

    carrito.forEach(producto=>{

        mensaje += "• " + producto.nombre +
                   " x" + producto.cantidad +
                   " - $" +
                   (producto.precio*producto.cantidad).toLocaleString()
                   + "%0A";

        total += producto.precio*producto.cantidad;

    });

    mensaje += "%0A";

    mensaje += "*TOTAL:* $" + total.toLocaleString() + "%0A%0A";

    mensaje += "*Observaciones:* " + observaciones;

    window.open(

        "https://wa.me/573005399798?text="+mensaje,

        "_blank"

    );

    localStorage.removeItem("carrito");

    alert("Pedido enviado correctamente.");

    window.location.href="/";

}