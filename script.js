const contadorCant = document.querySelector(".contador");
const btnPagarCompra = document.getElementById("btnPagarCompra");
    class Producto {
        constructor(nombre, precio, img, cantidad) {
            this.nombre = nombre;
            this.precio = precio;
            this.img = img;
            this.cantidad = cantidad;
        }

    }

    class Planta extends Producto {
        constructor(nombre, precio, img, cantidad, tipo) {
            super(nombre, precio, img, cantidad);
            this.tipo = tipo; 
        }
    }

    class Flor extends Producto {
        constructor(nombre, precio, img, cantidad, color) {
            super(nombre, precio, img, cantidad);
            this.color = color;
        }
    }

    class Catalogo {
        constructor() {
            this.productos = [];
        }

        agregarProducto(producto) {
            this.productos.push(producto);
        }

        mostrarProductosEnCards() {
            const contenedor = document.querySelector('.containerCard');
            contenedor.innerHTML = ''; 

            this.productos.forEach(producto => {
                contenedor.innerHTML += `
                    <div class="card">
                        <img src="${producto.img}" alt="${producto.nombre}" />
                        <h3>${producto.nombre}</h3>
                        <p>Precio: $${producto.precio}</p>
                        <button class="btn-agregar-carrito">Agregar al carrito</button>
                    </div>
                `;
            });

            this.agregarCarrito();
        }

        agregarCarrito() {
            document.querySelectorAll('.btn-agregar-carrito').forEach(boton => {
                boton.addEventListener('click', (e) => {
                    contadorCant.textContent++;
                    const nombreProducto = e.target.parentElement.querySelector('h3').textContent;
                    const producto = this.productos.find(p => p.nombre === nombreProducto);
                    if (producto) {
                        carrito.agregarProducto(producto);
                        carrito.mostrarCarrito();
                    }
                });
            });
        }
}
    
    class CarritoDeCompras {
        constructor() {
            this.productos = []; //se almacenan los productos que se ingresan al carrito
        }

        agregarProducto(productoIngresado) {//find, recorrelos productos que estan en el array y busca el que coincida 
            const productoExistente = this.productos.find(producto => producto.nombre === productoIngresado.nombre);
            if (productoExistente) {//si se encontró el producto
                productoExistente.cantidad += 1;//le aumenta la cantidad
            } else {
                this.productos.push({ ...productoIngresado });//si el producto no esta en el array, se lo agrega
            }
            this.mostrarCarrito();
        }

        eliminarProducto(nombreProductoAEliminar) {
            const producto = this.productos.find(producto => producto.nombre === nombreProductoAEliminar); //si en el array, hay un producto con el mismo nombre del que queremos elimiinar
            if (producto) { //si existe en el array
                contadorCant.textContent -= producto.cantidad;  //elimina toda la cantidad del producto en el carrito
                this.productos = this.productos.filter(producto => producto.nombre !== nombreProductoAEliminar);//crea un nuevo array con todos los productos que NO coinciden con el nombre que queremos eliminar
                this.mostrarCarrito();
            }
        }

        calcularTotal() {//reduce perdimite reducir los elementos del array a un solo valor. calcula el vosto del producto y lo suma a total
            return this.productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
        }

        vaciarCarrito() {
            this.productos = []; //vacio el array
            contadorCant.textContent = 0; //el contador lo actualiza a 0
            this.mostrarCarrito();
        }

        finalizarCompra() {
            const containerFormFinalizarCompra = document.getElementById('containerFormFinalizarCompra');
            const gridContainer = document.getElementById('gridContainer');
            containerFormFinalizarCompra.style.display = "flex";
            gridContainer.style.display = "none";
        }


        mostrarCarrito() {
            const contenedorCarrito = document.getElementById('gridContainer');//seleccionamos el grid que contiene al carrito

            //se reemplaza el contenido anterior por el nuevo
            contenedorCarrito.innerHTML = `
                <div class="cabeceraCarrito">Producto</div>
                <div class="cabeceraCarrito">Precio</div>
                <div class="cabeceraCarrito">Cantidad</div>
                <div class="cabeceraCarrito x" id="x">X</div>
            `;
            // Agregamos cada producto al carrito
            //el for each recoore el array y por cada producto crea una nueva fila
            this.productos.forEach(producto => {
                contenedorCarrito.innerHTML += `
                    <div class="item">${producto.nombre}</div>
                    <div class="item">$${producto.precio}</div>
                    <div class="item">
                        <button class="btnMenos" data-nombre="${producto.nombre}">-</button>
                        <span class="cantidadCarrito">${producto.cantidad}</span>
                        <button class="btnMas" data-nombre="${producto.nombre}">+</button>
                    </div>
                    <div class="item">
                        <button class="btnBorrar" data-nombre="${producto.nombre}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                `;
            });

            const total = this.calcularTotal(); //llamamos al metodo y calculamos el total de la compra sumando el precio de cada producto multiplicado por su cantidad
            
            //agregamos una fila más con el total de la compra, usamos toFixed(2) para que el total tenga dos decimales
            contenedorCarrito.innerHTML += `
                <div class="item total">Total</div>
                <div class="item total"></div>
                <div class="item total"></div>
                <div class="item total">$${total.toFixed(2)}</div>
            `;
            //agregamos 2 botones al final 
            contenedorCarrito.innerHTML += `
                <div class="containerBtnFinalizarCompra">
                    <button class="btnFinalizarCompra" id="btnFinalizarCompra">Finalizar compra</button>
                </div>
                <div class="containerBtnVaciarCarrito">
                    <button class="btnVaciarCarrito" id="btnVaciarCarrito">Vaciar carrito</button>
                </div>
                <div class="vidriado"></div>
            `;
            // Boton borrar carrito
            const btnVaciarCarrito = document.getElementById("btnVaciarCarrito"); //cuando se hace clic llama al metodo vaciarCarrito();
            btnVaciarCarrito.addEventListener("click", () => {
                this.vaciarCarrito();
                contenedorCarrito.innerHTML = "<div class='mensajeCarritoVacio'>Carrito vacio</div>";//cambiamos el contenido a carrito vacio
            });


            /*version 3 */
            
            let precioForm = document.getElementById("precioForm");
            const btnFinalizarCompra = document.getElementById("btnFinalizarCompra")
            btnFinalizarCompra.addEventListener("click", () => {
                this.finalizarCompra();
                precioForm.innerText = "$" + this.calcularTotal();
            });

                
            const containerFormFinalizarCompra = document.getElementById("containerFormFinalizarCompra");
            const btnCancelarCompra = document.getElementById("btnCancelarCompra");
            

            /*PASE LOS BOTONES DEL FORM PARA USAR LA CLASE CARRITO */
            btnCancelarCompra.addEventListener("click", function (event) {
                event.preventDefault();
                containerFormFinalizarCompra.style.display = "none"; // Oculta el formulario
                gridContainer.style.display = "none"; // Oculta el carrito de compras

                carrito.vaciarCarrito(); // Vacia el carrito
                contadorCant.textContent = 0; // Reinicia el contador de productos
                vidriado.style.display = "none";
                
            });
            const formFinalizarCompra = document.getElementById('formFinalizarCompra'); const compraRealizada = document.getElementById('compraRealizada');
            formFinalizarCompra.addEventListener('submit', function (e) {
                e.preventDefault(); // previene comportamiento form
                containerFormFinalizarCompra.style.display = "none"; // Oculta el formulario 
                compraRealizada.style.display = "block"; //muestra el popup
                    setTimeout(() => { //en 2 segundos el popup desaparece
                        compraRealizada.style.display = "none"; // Oculta el mensaje de compra realizada 
                    }, 1500); //en 1 segundo y medio el popup desaparece
                contadorCant.textContent = 0; //reinicia el contador
                vidriado.style.display = "none";  //saca el efecto
                carrito.vaciarCarrito();//reinicia el carrito
                formFinalizarCompra.reset();//limpia los campos del form
            })
            this.agregarCarrito();
        }

        agregarCarrito() {
            const botonesEliminar = document.querySelectorAll('.btnBorrar');
            const botonesMenos = document.querySelectorAll('.btnMenos');
            const botonesMas = document.querySelectorAll('.btnMas');

            botonesEliminar.forEach(boton => {
                boton.addEventListener('click', (e) => {
                    const botonEliminar = e.target.closest('.btnBorrar');
                    const nombreProducto = botonEliminar.dataset.nombre;
                    this.eliminarProducto(nombreProducto);
                });
            });

            botonesMenos.forEach(boton => {
                boton.addEventListener('click', (e) => {
                    contadorCant.textContent--;
                    const nombreProducto = e.target.dataset.nombre;
                    this.actualizarCantidad(nombreProducto, -1);
                });
            });

            botonesMas.forEach(boton => {
                boton.addEventListener('click', (e) => {
                    contadorCant.textContent++;
                    const nombreProducto = e.target.dataset.nombre;
                    this.actualizarCantidad(nombreProducto, 1);
                });
            });
        }

        actualizarCantidad(nombreProducto, cambio) {
            let producto = this.productos.find(producto => producto.nombre === nombreProducto);
            if (producto) {
                producto.cantidad += cambio;
                if (producto.cantidad <= 0) {
                    this.eliminarProducto(nombreProducto);
                } else {
                    this.mostrarCarrito();
                }
            } else {
                console.log("Producto no encontrado");
            }
        }
}

   




    const catalogo = new Catalogo();
    catalogo.agregarProducto(new Planta("Potus Scandens", 3500, "./assets/img/img1.webp", 1, "interior"));
    catalogo.agregarProducto(new Planta("Potus Golden", 4800, "./assets/img/img2.webp", 1, "interior"));
    catalogo.agregarProducto(new Planta("Ficus Lyrata", 11700, "./assets/img/img4.webp", 1, "interior"));
    catalogo.agregarProducto(new Planta("Costilla de Adán", 9800, "./assets/img/img3.webp", 1, "interior"));
    catalogo.agregarProducto(new Flor("Rosa", 1500, "./assets/img/rosa.png", 1, "Rosa"));
    catalogo.agregarProducto(new Flor("Margaritas", 2000, "./assets/img/margaritas.png", 1, "Blanco"));

    catalogo.mostrarProductosEnCards();

    const carrito = new CarritoDeCompras();