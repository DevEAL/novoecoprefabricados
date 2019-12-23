$(document).ready(function(){

    cargarJSON = () => {
    fetch('./products.json')
        .then((res) => {
            return res.json();
        })
        .then((data) =>{ 
            let cardProduct = '';

            data.forEach(element => {
                cardProduct += `
                    <div id="product-item" class="col-md-6 col-lg-4 col-xl-3 product-item" category="${element.category}">
                        <div class="card" data-id="${element.id}">
                            <img class="product-img" src="img/products/${element.img}" alt="">      
                            <h4>${element.name}</h4>
                            <div class="buttons">
                                <a href="producto.html?id=${element.id}" class="btn-novo-two">Ver más</a>
                                <a href="#" class="btn-novo-one agregar-carrito" data-id="${element.id}">Cotizar</a>
                            </div>
                        </div>
                    </div>
                `;
                document.getElementById('products').innerHTML = cardProduct;
            });
        });

    }
    cargarJSON();
    
    $('.nav-fill .nav-item').click(function(){
        let category = $(this).attr('category');
        
        $('.product-item').css('transform','scale(0)');
        function hideProducts(){
            $('.product-item').hide();
        } setTimeout(hideProducts,400);

        function showProduct(){
            $('.product-item[category="'+category+'"]').show();
            $('.product-item[category="'+category+'"]').css('transform','scale(1)');
        } setTimeout(showProduct,400);
    });

    $('.nav-fill .nav-item[category="all"]').click(function(){
        function showAll(){
            $('.product-item').show();
            $('.product-item').css('transform','scale(1)');
        } setTimeout(showAll,400);
    });

});

// const traerMiData = () => {
//     const productData = fetch('./products.json')
//         .then((res) => {
//             return res.json();
//         })
//         .then((data) =>{ 
//             return data;
//         });
//     return productData;
// }

// traerMiData().then(response => console.log(response));
// let miData = [];
// miData = traerMiData().then(response => (response));
// console.log(miData);
// miData.map(element => element.name);

const productos2 = document.getElementById('products');
loadEvents();
function loadEvents() {
    productos2.addEventListener('click', agregarProducto);
}

//Funciones
function agregarProducto(e){
    if(e.target.classList.contains('agregar-carrito')) {
        e.preventDefault();
        const producto = e.target.parentElement.parentElement;
        leerDatosProducto(producto);
    };
}

function leerDatosProducto(producto) {
    let id = producto.querySelector('a.agregar-carrito').getAttribute('data-id');
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
                        }
                        insertarCarrito(infoProducto);
                    }
                });
            });
    }
    traerMiData();

    // const infoProducto = {
    //     imagen: producto.querySelector('img').src,
    //     titulo: producto.querySelector('h4').textContent,
    //     id: producto.querySelector('a.agregar-carrito').getAttribute('data-id'),
    // }
    // insertarCarrito(infoProducto);
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
}


