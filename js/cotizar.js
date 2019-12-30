$(document).ready(function(){
    $('.colorselector').colorselector();
});

const carritoCot = document.getElementById('product-list');
const sendCot = document.getElementById('product-list');
const sendCantidad = document.getElementById('product-list');
const listaCarritoCot = document.querySelector('.product-list');
const vaciarCarritoBtnCot = document.querySelector('.vaciar-carrito');
const vaciarListaBtnCot = document.querySelector('.vaciar-lista');

//Listener
loadEventsCot();
function loadEventsCot() {
    carritoCot.addEventListener('click', eliminarProductoCot);
    sendCot.addEventListener('click', selectColor);
    sendCantidad.addEventListener('click', selectCantidad);
    vaciarCarritoBtnCot.addEventListener('click',vaciarCarritoCot);
    vaciarListaBtnCot.addEventListener('click',vaciarCarritoCot);
    document.addEventListener('DOMContentLoaded',leerLocalStorage);
}

function selectColor(e) {
    let color,
        colorTarget,
        idTarget,
        idObtener;
    let sendProducto = JSON.parse(localStorage.getItem('sendProductos'));
    if(e.target.classList.contains('selected')){
        colorTarget = e.target;
        color = colorTarget.getAttribute('data-value');
        idTarget = colorTarget.parentElement.parentElement.parentElement.parentElement;
        idObtener = idTarget.querySelector('select').getAttribute('id');
        sendProducto.forEach((producto, index) => {
            if(producto.id === idObtener) {
                producto.color = color;
                sendProducto.splice(index, 1, producto);
            }
        })
        localStorage.setItem('sendProductos', JSON.stringify(sendProducto));
    }
}

function selectCantidad(e) {
    let cantidad,
        cantidadTarget,
        idTarget,
        idObtener;
    let sendProducto = JSON.parse(localStorage.getItem('sendProductos'));
    if(e.target.classList.contains('cantselector')){
        cantidadTarget = e.target;
        cantidadTarget.addEventListener('change',function(){
            cantidad = cantidadTarget.value;
            idTarget = cantidadTarget;
            idObtener = idTarget.getAttribute('data-id');
            sendProducto.forEach((producto, index) => {
                if(producto.id === idObtener) {
                    producto.cantidad = cantidad;
                    sendProducto.splice(index, 1, producto);
                }
            })
            localStorage.setItem('sendProductos', JSON.stringify(sendProducto));
            console.log(idObtener);
        })
    }
}

function actualizarCantidad() {
    let productosLS = obtenerLocalStorage();
    let counter = document.querySelector('.quantity');
    let setCounter = productosLS.length;
    counter.innerHTML= setCounter;
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
    eliminarProductoSend(productoId);
    actualizarCantidad();
}

function vaciarCarritoCot(e) {
    e.preventDefault();
    while(listaCarritoCot.firstChild) {
        listaCarritoCot.removeChild(listaCarritoCot.firstChild);
    }
    vaciarLocalStorage();
    actualizarCantidad();
    return false;
}

function vaciarLocalStorage() {
    localStorage.removeItem('productos');
    localStorage.removeItem('sendProductos');
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
            <select id="${producto.id}" class="colorselector">
                
            </select>
        </div>
        <div class="col-md-1 cot-cantidad">
            <select data-id="${producto.id}" class="cantselector">
                <option class="catOption" value="-49">-49</option>
                <option class="catOption" value="+50"> +50 </option>
                <option class="catOption" value="+100">+100</option>
                <option class="catOption" value="+200">+200</option>
                <option class="catOption" value="+300">+300</option>
                <option class="catOption" value="+400">+400</option>
            </select>
        </div>
        <div class="col-md-1 cot-delete">
            <button data-id="${producto.id}" class="borrar-producto"><i data-id="${producto.id}" class="fas fa-times borrar-producto-2" ></i></button>
        </div>
        `;
        let colores = '';
        document.querySelector('.product-list').appendChild(row);
        producto.color.forEach((datacolor, index) => {
            colores += `
                <option value="${datacolor}" data-color="${producto.hexa[index]}">gris</option>
            `;
            document.getElementById(`${producto.id}`).innerHTML = colores;
        });

    });
}

function eliminarProductoSend(productoId) {
    let sendProductos;
    sendProductos = JSON.parse(localStorage.getItem('sendProductos'));
    sendProductos.forEach((sendProducto , index) => {
        if(sendProducto.id === productoId) {
            sendProductos.splice(index, 1);
        }
    });
    localStorage.setItem('sendProductos', JSON.stringify(sendProductos));
}