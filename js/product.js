$(document).ready(function() {
    getGET = () => {
        let loc = document.location.href;
        if(loc.indexOf('?')>0) {
            let getString = loc.split('?')[1];
            let GET = getString.split('&');
            let get = {};
 
            for(let i = 0, l = GET.length; i < l; i++){
                let tmp = GET[i].split('=');
                get[tmp[0]] = unescape(decodeURI(tmp[1]));
            }
            return get;
        }
    }
    
    cargarJSON = () => {
    fetch('./products.json')
        .then((res) => {
            return res.json();
        })
        .then((data) =>{ 
            let obtId = getGET();
            let helper = data[obtId.id];
            $('#product-title').text(`${helper.name}`);

            let cardProduct = '';
            cardProduct += `
            <div class="col-lg-6 description">
                <h4>Descripción</h4>
                <div class="product-arrow-left">
                    <a href="productos.html#products"><img src="img/svg/left-arrow-icon.svg" alt="volver atrás"></a>
                </div>
                <p>${helper.description}</p>
                <ul>
                    <li><span>Textura:</span> ${helper.texture}</li>
                    <li><span>Resistencia:</span> ${helper.resistance}</li>
                    <li><span>Norma aplicada:</span> ${helper.rules}</li>
                </ul>

                <a class="btn-novo-one agregar-carrito" href="#" data-id="${helper.id}">Agregar a cotizar</a>
            </div>
            <div class="col-lg-6 product">
                <img id="product-img" class="product-img" src="img/products/${helper.img}" alt="">
                <p>Colores:</p>
                <div id="colors" class="colors">

                </div>
                <hr>
                <div class="features">
                    <div class="feature-item" data-toggle="tooltip" data-placement="top" data-html="true" title=" Peso unitario </br> Kilogramos / Unidades">
                        <img src="img/svg/weight-icon.svg" alt="">
                        ${helper.weight}
                    </div>
                    <div class="feature-item" data-toggle="tooltip" data-placement="top" data-html="true" title=" Medidas </br> Largo x Ancho x Alto </br> Centimetros">
                        <img src="img/svg/measure-icon.svg" alt="">
                        ${helper.size}
                    </div>
                    <div class="feature-item" data-toggle="tooltip" data-placement="top" data-html="true" title="Perfil de rendimiento </br> Unidades / Metro </br> cuadrado">
                        <img src="img/svg/efficiency.svg" alt="">
                        ${helper.performance}
                    </div>
                </div>
                <p class="note">*Los colores y texturas se aproximan al producto que está en nuestro portafolio.</p>
            </div>
            `;
            document.getElementById('product-content').innerHTML = cardProduct;
            
            let colors = '';
            let carr = helper.hexa;
            carr.forEach((element, index) => {
                colors += `
                    <div onclick="cambiarImagen('${helper.carousel[index]}')" class="color" style="background: ${element};"></div>
                `;
                document.getElementById('colors').innerHTML = colors;
            });
            
            $(function(){
                $('[data-toggle="tooltip"]').tooltip()
            });
        });
    }
    cargarJSON();

    $('.owl-proyects').owlCarousel({
        items:4,
        loop:true,
        margin:20,
        nav:true,
        dots:true,
        autoplay:true,
        autoplayTimeout:8000,
        navText: [
          '<img src="img/svg/left-arrow-icon.svg" alt="">',
          '<img src="img/svg/right-arrow-icon.svg" alt="">'
        ]
    });

});

const productos3 = document.querySelector('body');
loadEvents();
function loadEvents() {
    productos3.addEventListener('click', agregarProducto);
}


function cambiarImagen(clr) {
    document.getElementById("product-img").setAttribute("src",clr);
}

//Funciones
function agregarProducto(e){
    if(e.target.classList.contains('agregar-carrito')) {
        e.preventDefault();
        leerDatosProducto();
        $("#productoAgregado").addClass("agregado");
        setTimeout(function(){ 
            $("#productoAgregado").removeClass("agregado");
        }, 3000);
    };
}

function leerDatosProducto() {
    let id = document.querySelector('a.agregar-carrito').getAttribute('data-id');
    const traerMiData = () => {
        const productData = fetch('./products.json')
            .then((res) => {
                return res.json();
            })
            .then((data) =>{ 
                data.forEach(element => {
                    if(element.id === id){
                        const infoProducto = {
                            id: element.id,
                            nombre: element.name,
                            imagen: element.img,
                            descripcion: element.description,
                            color: element.color,
                            hexa: element.hexa
                        }
                        insertarCarrito(infoProducto);
                    }
                });
            });
    }
    traerMiData();
}

function carritoSend() {
    let productosLS = JSON.parse(localStorage.getItem('productos'));
    let sendProducto = [];
    productosLS.forEach((producto, index) => {
        let send = {
            id: producto.id,
            nombre: producto.nombre,
            color: 'Gris',
            cantidad: '-49'
        }
        sendProducto.push(send);
    });
    localStorage.setItem('sendProductos', JSON.stringify(sendProducto));
}

function actualizarCantidad() {
    let productosLS = obtenerLocalStorage();
    let counter = document.querySelector('.quantity');
    let setCounter = productosLS.length;
    counter.innerHTML= setCounter;
}

function insertarCarrito(producto) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="img/products/${producto.imagen}" alt=""></td>
        <td>${producto.nombre}</td>
        <td><button data-id="${producto.id}" class="borrar-producto"><i data-id="${producto.id}" class="fas fa-times borrar-producto-2" ></i></button></td>
    `;
    listaCarrito.appendChild(row);
    guardarLocalStorage(producto);
    carritoSend();
    actualizarCantidad();
}
