// ================================
// CARRITO DE COMPRAS
// ================================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContador();

}

function actualizarContador() {

    const contador = document.getElementById("contador-carrito");

    if(contador){

        let cantidad = 0;

        carrito.forEach(producto=>{

            cantidad += producto.cantidad;

        });

        contador.innerHTML = cantidad;

    }

}

function agregarProducto(nombre,precio,imagen){

    const productoExistente = carrito.find(

        item=>item.nombre===nombre

    );

    if(productoExistente){

        productoExistente.cantidad++;

    }else{

        carrito.push({

            nombre:nombre,

            precio:precio,

            imagen:imagen,

            cantidad:1

        });

    }

    guardarCarrito();

    alert(nombre + " agregado al carrito");

}

window.onload = actualizarContador;

// ================================
// MOSTRAR CARRITO
// ================================

function mostrarCarrito(){

    const lista = document.getElementById("lista-carrito");

    if(!lista) return;

    lista.innerHTML="";

    let total = 0;

    let cantidad = 0;

    if(carrito.length==0){

        lista.innerHTML=`

            <div class="alert alert-warning">

                Tu carrito está vacío.

            </div>

        `;

        document.getElementById("total-carrito").innerHTML="Total: $0";

        document.getElementById("cantidad-productos").innerHTML="0";

        return;

    }

    carrito.forEach((producto,index)=>{

        total += producto.precio * producto.cantidad;

        cantidad += producto.cantidad;

        lista.innerHTML +=`

        <div class="card mb-4 shadow carrito-item">

            <div class="row">

                <div class="col-md-3">

                    <img

                    src="/static/img/${producto.imagen}"

                    class="img-fluid imagen-carrito">

                </div>

                <div class="col-md-5">

                    <h4>${producto.nombre}</h4>

                    <p>

                        Precio:

                        <strong>$${producto.precio.toLocaleString()}</strong>

                    </p>

                </div>

                <div class="col-md-2 text-center">

                    <button class="btn btn-secondary"

                    onclick="disminuir(${index})">

                    -

                    </button>

                    <h5 class="my-2">

                    ${producto.cantidad}

                    </h5>

                    <button class="btn btn-secondary"

                    onclick="aumentar(${index})">

                    +

                    </button>

                </div>

                <div class="col-md-2 text-center">

                    <h5>

                    $${(producto.precio*producto.cantidad).toLocaleString()}

                    </h5>

                    <button

                    class="btn btn-danger"

                    onclick="eliminar(${index})">

                    🗑

                    </button>

                </div>

            </div>

        </div>

        `;

    });

    document.getElementById("cantidad-productos").innerHTML=cantidad;

    document.getElementById("total-carrito").innerHTML=

    "Total: $"+total.toLocaleString();

}

window.onload = function(){

    actualizarContador();

    mostrarCarrito();

}

function aumentar(index){

    carrito[index].cantidad++;

    guardarCarrito();

    mostrarCarrito();

}

function disminuir(index){

    carrito[index].cantidad--;

    if(carrito[index].cantidad<=0){

        carrito.splice(index,1);

    }

    guardarCarrito();

    mostrarCarrito();

}

function eliminar(index){

    carrito.splice(index,1);

    guardarCarrito();

    mostrarCarrito();

}