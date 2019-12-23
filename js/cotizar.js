$(document).ready(function(){
    $('.colorselector').colorselector();
});

const carritoCot = document.getElementById('product-list');
const listaCarritoCot = document.querySelector('.product-list');
const vaciarCarritoBtnCot = document.querySelector('.vaciar-carrito');


//Listener
loadEventsCot();
function loadEventsCot() {
    carritoCot.addEventListener('click', eliminarProductoCot );
    vaciarCarritoBtnCot.addEventListener('click',vaciarCarritoCot);
    document.addEventListener('DOMContentLoaded',leerLocalStorage);
}


function eliminarProductoCot(e) {
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

function vaciarCarritoCot(e) {
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
        const row = document.createElement('div');
        row.className = "row cot-product";
        row.innerHTML = `
        <div class="col-md-2 cot-img">
            <img src="img/products/${producto.imagen}" alt="">
        </div>
        <div class="col-md-3 cot-name">${producto.nombre}</div>
        <div class="col-md-4 cot-description">${producto.descripcion}</div>
        <div class="col-md-1 cot-color">
            <select class="colorselector">
                <option value="gris" data-color="#ABABA9">gris</option>
                <option value="tierra" data-color="#695850">tierra</option>
                <option value="ocre" data-color="#96723A">ocre</option>
                <option value="rojo" data-color="#7B2A2F">rojo</option>
                <option value="negro" data-color="#332A2F">negro</option>
                <option value="naranja" data-color="#925831">naranja</option>
                <option value="verde" data-color="#566A28">verde</option>
                <option value="azul" data-color="#456780">azul</option>
            </select>
        </div>
        <div class="col-md-1 cot-cantidad">
            <select class="cantselector">
                <option value="-49">-49</option>
                <option value="+50"> +50 </option>
                <option value="+100">+100</option>
                <option value="+200">+200</option>
                <option value="+300">+300</option>
                <option value="+400">+400</option>
            </select>
        </div>
        <div class="col-md-1 cot-delete">
            <button data-id="${producto.id}" class="borrar-producto"><i data-id="${producto.id}" class="fas fa-times borrar-producto-2" ></i></button>
        </div>
    `;
    document.querySelector('.product-list').appendChild(row);
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