// =====================================================
// ================= MEN� M�VIL =========================
// =====================================================

const menuToggle = document.getElementById("menuToggle");
const navMenus = document.querySelectorAll(".nav-menu");

if (menuToggle) {

    menuToggle.addEventListener("click", function () {

        navMenus.forEach(function(menu) {
            menu.classList.toggle("active");
        });

        if (menuToggle.textContent.trim() === "☰") {
            menuToggle.textContent = "✕";
        } else {
            menuToggle.textContent = "☰";
        }

    });

}


// =====================================================
// ============== CERRAR MEN� AL SELECCIONAR ============
// =====================================================

document.querySelectorAll(".nav-menu a").forEach(function(link) {

    link.addEventListener("click", function() {

        navMenus.forEach(function(menu) {
            menu.classList.remove("active");
        });

        if (menuToggle) {
            menuToggle.textContent = "☰";
        }

    });

});


// =====================================================
// ====================== CARRITO ========================
// =====================================================

let carrito = [];

const cartButton = document.getElementById("cartButton");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");


// =====================================================
// ================= ABRIR CARRITO =======================
// =====================================================

if (cartButton) {

    cartButton.addEventListener("click", function() {

        cartOverlay.classList.add("active");

    });

}


// =====================================================
// ================= CERRAR CARRITO ======================
// =====================================================

if (closeCart) {

    closeCart.addEventListener("click", function() {

        cartOverlay.classList.remove("active");

    });

}


// =====================================================
// ============== CERRAR CLIC FUERA ======================
// =====================================================

if (cartOverlay) {

    cartOverlay.addEventListener("click", function(event) {

        if (event.target === cartOverlay) {

            cartOverlay.classList.remove("active");

        }

    });

}


// =====================================================
// =============== AGREGAR PRODUCTOS ====================
// =====================================================


// ================= PRODUCTOS NORMALES =================

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // -----------------------------
        // Datos del producto
        // -----------------------------

        const nombre = button.getAttribute("data-name");

        const precioBase = Number(
            button.getAttribute("data-price")
        );


        // -----------------------------
        // Buscar tarjeta
        // -----------------------------

        const tarjeta = button.closest(".product-card");


        // -----------------------------
        // Buscar topping
        // -----------------------------

        const toppingCheckbox =
            tarjeta
                ? tarjeta.querySelector(".extra-topping")
                : null;


        const tieneTopping =
            toppingCheckbox
                ? toppingCheckbox.checked
                : false;


        // -----------------------------
        // Precio del topping
        // -----------------------------

        let precioTopping = 0;

        if (tieneTopping) {

            precioTopping = Number(
                toppingCheckbox.getAttribute(
                    "data-topping-price"
                )
            );

            if (!precioTopping || precioTopping <= 0) {

                if (
                    nombre.toLowerCase().includes("cono")
                ) {

                    precioTopping = 10;

                } else {

                    precioTopping = 15;

                }

            }

        }


        // -----------------------------
        // Precio final
        // -----------------------------

        const precioFinal =
            precioBase + precioTopping;


        // -----------------------------
        // Nombre del producto
        // -----------------------------

        const nombreCarrito =
            tieneTopping
                ? nombre + " + Topping"
                : nombre;


        // -----------------------------
        // Buscar producto existente
        // -----------------------------

        const productoExistente =
            carrito.find(function(producto) {

                return producto.nombre === nombreCarrito;

            });


        // -----------------------------
        // Aumentar cantidad
        // -----------------------------

        if (productoExistente) {

            productoExistente.cantidad++;

        }


        // -----------------------------
        // Producto nuevo
        // -----------------------------

        else {

            carrito.push({

                nombre: nombreCarrito,

                precio: precioFinal,

                cantidad: 1

            });

        }


        // -----------------------------
        // Desmarcar topping
        // -----------------------------

        if (toppingCheckbox) {

            toppingCheckbox.checked = false;

        }


        // -----------------------------
        // Actualizar carrito
        // -----------------------------

        actualizarCarrito();


        // -----------------------------
        // Abrir carrito
        // -----------------------------

        if (cartOverlay) {

            cartOverlay.classList.add("active");

        }

    });

});


// =====================================================
// ============== BOTONES ESPECIALES SUNDAE =============
// =====================================================

const sundaeButtons =
    document.querySelectorAll(".sundae-option");


sundaeButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const nombre =
            button.getAttribute("data-name");

        const precioBase =
            Number(
                button.getAttribute("data-price")
            );

        const tarjeta =
            button.closest(".product-card");

        const toppingSelector =
            tarjeta
                ? tarjeta.querySelector(".topping-selector")
                : null;

        const cantidadToppings =
            toppingSelector
                ? Number(
                    toppingSelector.dataset.cantidad || 0
                )
                : 0;

        const precioToppings =
            cantidadToppings * 15;

        const precioFinal =
            precioBase + precioToppings;

        let nombreCarrito = nombre;

        if (cantidadToppings > 0) {

            nombreCarrito +=
                " + " +
                cantidadToppings +
                (
                    cantidadToppings === 1
                        ? " Topping"
                        : " Toppings"
                );

        }

        const productoExistente =
            carrito.find(function(producto) {

                return producto.nombre === nombreCarrito;

            });

        if (productoExistente) {

            productoExistente.cantidad++;

        } else {

            carrito.push({

                nombre: nombreCarrito,

                precio: precioFinal,

                cantidad: 1

            });

        }

        // Reiniciar toppings

        if (toppingSelector) {

            toppingSelector.dataset.cantidad = "0";

            const quantity =
                toppingSelector.querySelector(
                    ".topping-quantity"
                );

            if (quantity) {

                quantity.textContent = "0";

            }

        }

        actualizarCarrito();

        if (cartOverlay) {

            cartOverlay.classList.add("active");

        }

    });

});


// =====================================================
// ============== CANTIDAD DE TOPPINGS =================
// =====================================================

const toppingSelectors =
    document.querySelectorAll(".topping-selector");


toppingSelectors.forEach(function(selector) {

    let cantidad = 0;

    const minus =
        selector.querySelector(".topping-minus");

    const plus =
        selector.querySelector(".topping-plus");

    const quantity =
        selector.querySelector(".topping-quantity");


    // AUMENTAR

    plus.addEventListener("click", function(event) {

        event.preventDefault();

        cantidad++;

        quantity.textContent = cantidad;

        selector.dataset.cantidad = cantidad;

    });


    // DISMINUIR

    minus.addEventListener("click", function(event) {

        event.preventDefault();

        if (cantidad > 0) {

            cantidad--;

        }

        quantity.textContent = cantidad;

        selector.dataset.cantidad = cantidad;

    });

});


// =====================================================
// ================= ACTUALIZAR CARRITO =================
// =====================================================

function actualizarCarrito() {

    if (!cartItems) return;


    cartItems.innerHTML = "";


    let total = 0;

    let cantidadTotal = 0;


    // -----------------------------
    // Carrito vacío
    // -----------------------------

    if (carrito.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">
                Tu carrito esta vacio.
            </p>

        `;


        if (cartCount) {
            cartCount.textContent = "0";
        }


        if (cartTotal) {
            cartTotal.textContent = "0";
        }


        return;

    }


    // -----------------------------
    // Crear productos
    // -----------------------------

    carrito.forEach(function(producto, index) {


        const subtotal =
            producto.precio * producto.cantidad;


        total += subtotal;

        cantidadTotal += producto.cantidad;


        const elemento =
            document.createElement("div");


        elemento.className = "cart-item";


elemento.innerHTML = `

    <div class="cart-item-info">

        <h4>
            ${producto.nombre}
        </h4>

        <p>
            L ${producto.precio} x ${producto.cantidad}
        </p>

    </div>

    <strong>
        L ${subtotal}
    </strong>

    <button
        class="remove-item"
        onclick="eliminarProducto(${index})">

        ✕

    </button>

`;


        cartItems.appendChild(elemento);

    });


    // -----------------------------
    // Contador
    // -----------------------------

    if (cartCount) {

        cartCount.textContent =
            cantidadTotal;

    }


    // -----------------------------
    // Total
    // -----------------------------

    if (cartTotal) {

        cartTotal.textContent =
            total;

    }

}


// =====================================================
// ================= ELIMINAR PRODUCTO ==================
// =====================================================

function eliminarProducto(index) {

    carrito.splice(index, 1);

    actualizarCarrito();

}


// Hacer disponible para el onclick del HTML
window.eliminarProducto = eliminarProducto;



// =====================================================
// ================= REALIZAR PEDIDO ====================
// =====================================================

const checkoutButton = document.getElementById("checkout");

if (checkoutButton) {

    checkoutButton.addEventListener("click", function() {

        if (carrito.length === 0) {

            alert("Tu carrito esta vacio.");

            return;

        }

        let mensaje =
            "🍦 *CILA'S ICE CREAM* 🍦\n" +
            "━━━━━━━━━━━━━━━━━━━━\n\n" +

            "🧾 *NUEVO PEDIDO*\n\n" +

            "¡Hola! 💕\n" +

            "Me gustaría realizar el siguiente pedido:\n\n";


        let total = 0;


        carrito.forEach(function(producto) {

            const subtotal =
                producto.precio * producto.cantidad;

            total += subtotal;


            mensaje +=
                "🍨 *" +
                producto.nombre +
                "*\n" +

                "   🔢 Cantidad: " +
                producto.cantidad +
                "\n" +

                "   💰 Precio: L " +
                producto.precio +
                "\n" +

                "   💵 Subtotal: *L " +
                subtotal +
                "*\n\n";

        });


        mensaje +=
            "━━━━━━━━━━━━━━━━━━━━\n" +

            "💳 *TOTAL DEL PEDIDO: L " +
            total +
            "*\n" +

            "━━━━━━━━━━━━━━━━━━━━\n\n" +

            "📲 Quedo atento(a) a su confirmación.\n\n" +

            "✨ ¡Muchas gracias! 💕🍦";


        const numeroWhatsApp = "50498559682";


        const url =
            "https://wa.me/" +
            numeroWhatsApp +
            "?text=" +
            encodeURIComponent(mensaje);


        window.open(url, "_blank");

    });

}




// =====================================================
// ================== FOTOGALER�A =======================
// =====================================================

const galleryImages = [

    "img/localdentro.jpeg",
    "img/1.jpeg",
    "img/2.jpeg",
    "img/4.jpeg",
    "img/3.jpeg",
    "img/bananasplit.jpeg",
    "img/sundaechocolate.jpeg"

];


let currentImage = 0;


const galleryImage =
    document.getElementById("galleryImage");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const galleryDots =
    document.getElementById("galleryDots");


// =====================================================
// ================= CREAR PUNTOS =======================
// =====================================================

if (galleryDots) {

    galleryImages.forEach(function(image, index) {


        const dot =
            document.createElement("span");


        dot.classList.add(
            "gallery-dot"
        );


        if (index === 0) {

            dot.classList.add(
                "active"
            );

        }


        dot.addEventListener(
            "click",
            function() {

                currentImage = index;

                changeGalleryImage();

            }
        );


        galleryDots.appendChild(dot);

    });

}


// Obtener puntos despu�s de crearlos
const dots =
    document.querySelectorAll(
        ".gallery-dot"
    );


// =====================================================
// =============== CAMBIAR IMAGEN =======================
// =====================================================

function changeGalleryImage() {

    if (!galleryImage) return;


    galleryImage.style.opacity = "0";


    setTimeout(function() {


        galleryImage.src =
            galleryImages[currentImage];


        galleryImage.style.opacity = "1";


    }, 150);


    dots.forEach(function(dot) {

        dot.classList.remove(
            "active"
        );

    });


    if (dots[currentImage]) {

        dots[currentImage].classList.add(
            "active"
        );

    }

}


// =====================================================
// ================= IMAGEN ANTERIOR ====================
// =====================================================

if (prevBtn) {

    prevBtn.addEventListener(
        "click",
        function() {


            currentImage--;


            if (currentImage < 0) {

                currentImage =
                    galleryImages.length - 1;

            }


            changeGalleryImage();

        }
    );

}


// =====================================================
// ================= IMAGEN SIGUIENTE ====================
// =====================================================

if (nextBtn) {

    nextBtn.addEventListener(
        "click",
        function() {


            currentImage++;


            if (
                currentImage >=
                galleryImages.length
            ) {

                currentImage = 0;

            }


            changeGalleryImage();

        }
    );

}