$(document).ready(function(){

    const owlHome = $('.owl-home');
    $(owlHome).on("initialized.owl.carousel", () => {
        setTimeout(() => {
          $(".owl-item.active .owl-slide-animated").addClass("is-transitioned");
        }, 200);
    });

    owlHome.owlCarousel({
        margin:10,
        items:1,
        loop:true,
        nav:true,
        autoplay:true,
        autoplayTimeout:10000,
        navText: [
            '<img src="img/svg/left-arrow-w.svg" alt="">',
            '<img src="img/svg/right-arrow-w.svg" alt="">'
        ]
    });

    $(owlHome).on("changed.owl.carousel", e =>{
        $(".owl-slide-animated").removeClass("is-transitioned");
        const currentOwlItem = $(".owl-item").eq(e.item.index);
        currentOwlItem.find(".owl-slide-animated").addClass("is-transitioned");
    });

    $('.owl-home-products').owlCarousel({
        items:1,
        loop:true,
        margin:10,
        nav:true,
        dots:false,
        autoplay:true,
        autoplayTimeout:8000,
        navText: [
          '<img src="img/svg/left-arrow-icon.svg" alt="">',
          '<img src="img/svg/right-arrow-icon.svg" alt="">'
        ]
    });

    $('.floating-wpp').floatingWhatsApp({
        phone: '57 3182153129',
        popupMessage: 'Este chat esta disponible para resolver sus inquietudes. Le responderemos en el menor tiempo posible.',
        showPopup: true,
        message: 'Escribe aqui ...',
        headerTitle: 'Chat Novo',
        position: 'left'
    });
    
})

//Carro cotizador
//Variables
const carrito = document.getElementById('cot-box');
const productos = document.getElementById('products');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

//Listener
loadEvents();
function loadEvents() {
    carrito.addEventListener('click', eliminarProducto);
    vaciarCarritoBtn.addEventListener('click',vaciarCarrito);
    document.addEventListener('DOMContentLoaded',leerLocalStorage);
}


function eliminarProducto(e) {
    let producto,
    productoId;
    if(e.target.classList.contains('borrar-producto')) {
        e.preventDefault();
        producto = e.target.parentElement.parentElement;
        productoId = producto.querySelector('button').getAttribute('data-id');
        const allTarget = document.querySelectorAll(`.borrar-producto[data-id="${productoId}"]`);
        allTarget.forEach(info =>{
            info.parentElement.parentElement.remove();
        })
    }
    if(e.target.classList.contains('borrar-producto-2')) {
        e.preventDefault();
        producto = e.target.parentElement.parentElement.parentElement;
        productoId = producto.querySelector('i').getAttribute('data-id');
        const allTarget = document.querySelectorAll(`.borrar-producto-2[data-id="${productoId}"]`);
        allTarget.forEach(info =>{
            info.parentElement.parentElement.parentElement.remove();
        })
    }
    eliminarProductoLocalStorage(productoId);
}

function vaciarCarrito(e) {
    e.preventDefault();
    while(listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
    return false;
}

function guardarLocalStorage(producto) {
    let productos;
    productos = obtenerLocalStorage();
    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos));
}

function obtenerLocalStorage() {
    let productosLS;
    if(localStorage.getItem('productos') === null ) {
        productosLS = [];
    } else {
        productosLS = JSON.parse(localStorage.getItem('productos'));
    }
    return productosLS;
}

function leerLocalStorage() {
    let productosLS;
    productosLS = obtenerLocalStorage();
    productosLS.forEach((producto) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="img/products/${producto.imagen}" alt=""></td>
        <td>${producto.nombre}</td>
        <td><button data-id="${producto.id}" class="borrar-producto"><i data-id="${producto.id}" class="fas fa-times borrar-producto-2"></i></button></td>
    `;
    listaCarrito.appendChild(row);
    })
}

function eliminarProductoLocalStorage(productoId) {
    let productosLS;
    productosLS = obtenerLocalStorage();
    productosLS.forEach((productoLS , index) => {
        if(productoLS.id === productoId) {
            productosLS.splice(index, 1);
        }
    });
    localStorage.setItem('productos', JSON.stringify(productosLS));
}

const formulario = document.getElementById('formularioContacto');
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    var datos = new FormData(formulario);
    
    let array = {
        "name" : datos.get('name'),
        "email" : datos.get('email'),
        "phone" : datos.get('phone'),
        "company" : datos.get('company'),
        "position" : datos.get('position'),
        "message" : datos.get('message')
    }

    console.log(array);

    fetch('http://novoecoprefabricados.com/Api/public/Api/Contact/Post',{
        method: 'POST',
        body: JSON.stringify(array),
        headers: {
            'Content-Type':'aplication/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        array = {}
        console.log('Enviado Correctamente');
    })
})