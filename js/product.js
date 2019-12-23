$(document).ready(function(){
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
            // console.log(helper.description);
            $('#product-title').text(`${helper.name}`);

            let cardProduct = '';
            cardProduct += `
            <div class="col-lg-6 description">
                <h4>Descripción</h4>
                <p>${helper.description}</p>
                <ul>
                    <li><span>Textura:</span> ${helper.texture}</li>
                    <li><span>Resistencia:</span> ${helper.resistance}</li>
                    <li><span>Norma aplicada:</span> ${helper.rules}</li>
                </ul>

                <a class="btn-novo-one agregar-carrito" href="#" data-id="${helper.id}">Agregar a cotizar</a>
            </div>
            <div class="col-lg-6 product">
                <img class="product-img" src="img/products/${helper.img}" alt="">
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
                <p>Colores:</p>
                <div class="colors">
                    <a class="color" href="#" style="background: #ABABA9;"></a>
                    <a class="color" href="#" style="background: #695850;"></a>
                    <a class="color" href="#" style="background: #96723A;"></a>
                    <a class="color" href="#" style="background: #7B2A2F;"></a>
                    <a class="color" href="#" style="background: #332A2F;"></a>
                    <a class="color" href="#" style="background: #925831;"></a>
                    <a class="color" href="#" style="background: #566A28;"></a>
                    <a class="color" href="#" style="background: #456780;"></a>
                </div>
                <p class="note">*Los colores y texturas se aproximan al producto que está en nuestro portafolio.</p>
            </div>
            `;
            document.getElementById('product-content').innerHTML = cardProduct;
            
            $(function(){
                $('[data-toggle="tooltip"]').tooltip()
            })
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

//Funciones
function agregarProducto(e){
    if(e.target.classList.contains('agregar-carrito')) {
        e.preventDefault();
        leerDatosProducto();
    };
}

function leerDatosProducto() {
    const infoProducto = {
        imagen: document.querySelector('.product-img').src,
        titulo: document.querySelector('h1').textContent,
        id: document.querySelector('a.agregar-carrito').getAttribute('data-id')
    }
    insertarCarrito(infoProducto);
}

function insertarCarrito(producto) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${producto.imagen}" alt=""></td>
        <td>${producto.titulo}</td>
        <td><button data-id="${producto.id}" class="borrar-producto"><i data-id="${producto.id}" class="fas fa-times borrar-producto-2" ></i></button></td>
    `;
    listaCarrito.appendChild(row);
    guardarLocalStorage(producto);
}
