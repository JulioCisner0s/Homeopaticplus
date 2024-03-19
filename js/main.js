//PRODUCTOS

const productos = [
    {
        id: "Producto-01",
        titulo: "Dr.Reckeweg R10",
        imagen: " ../images/Producto1.webp",
        categoria: {
            nombre: "Bebibles",
            id: "bebibles"
        },
        precio: 499
    },

    {
        id: "Producto-02",
        titulo: "Expecto DHU",
        imagen: " ../images/Producto2.jpeg",
        categoria: {
            nombre: "Bebibles",
            id: "bebibles"
        },
        precio: 799
    },

    {
        id: "Producto-03",
        titulo: "Spigelon",
        imagen: " ../images/Producto3.jpg",
        categoria: {
            nombre: "Bebibles",
            id: "bebibles"
        },
        precio: 399
    },

    {
        id: "Producto-04",
        titulo: "Guna Allergy",
        imagen: " ../images/Producto4.jpg",
        categoria: {
            nombre: "Bebibles",
            id: "bebibles"
        },
        precio: 799
    },

    {
        id: "Producto-05",
        titulo: "Dr.Manfort",
        imagen: " ../images/Producto5.png",
        categoria: {
            nombre: "Bebibles, Pastillas",
            id: "bebibles, pastillas"
        },
        precio: 1000
    },

    {
        id: "Producto-06",
        titulo: "Spascupreet",
        imagen: " ../images/Producto6.jpg",
        categoria: {
            nombre: "Pastillas",
            id: "pastillas"
        },
        precio: 1299
    },

    {
        id: "Producto-07",
        titulo: "Belladona-Homaccord",
        imagen: " ../images/Producto7.png",
        categoria: {
            nombre: "Gotas",
            id: "gotas"
        },
        precio: 249
    },

    {
        id: "Producto-08",
        titulo: "Graphitex 6X",
        imagen: " ../images/Producto8.jpeg",
        categoria: {
            nombre: "Gotas",
            id: "gotas"
        },
        precio: 499
    },
]


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto")
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}MXN</p>
                <button class="producto-agregar" id= "${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div)
    })
    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }else {
            tituloPrincipal.innerHTML = "Todos los Productos";
            cargarProductos(productos);
        }
    })
})

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}
let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if(productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}