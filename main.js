
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}


const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');
const productContainer = document.querySelector('.products');
const emptyCartButton = document.getElementById('emptyCart'); 


async function fetchProducts() {
    try {
        const response = await fetch('./products.json');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}


function displayProducts(products) {
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
                Agregar al carrito
            </button>
            <button class="remove-from-cart" data-id="${product.id}">Quitar del carrito</button>
        `;

        productContainer.appendChild(productDiv);
    });

    
    setupButtons();
}


function setupButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'));
            const name = button.getAttribute('data-name');
            const price = button.getAttribute('data-price');
            addToCart(id, name, price);
        });
    });

    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'));
            removeFromCart(id);
        });
    });

   
    emptyCartButton.addEventListener('click', emptyCart);
}


function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    const product = { id, name, price: parseFloat(price) };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();

    
    Swal.fire({
        title: 'Producto agregado',
        text: `${name} ha sido agregado al carrito.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
    });
}


function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter(product => product.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();

    Swal.fire({
        title: 'Producto removido',
        text: `El producto ha sido eliminado del carrito.`,
        icon: 'warning',
        timer: 1500,
        showConfirmButton: false
    });
}


function emptyCart() {
    localStorage.setItem('cart', JSON.stringify([])); 
    updateCart(); 

    
    Swal.fire({
        title: 'Carrito vaciado',
        text: `Todos los productos han sido eliminados del carrito.`,
        icon: 'info',
        timer: 1500,
        showConfirmButton: false
    });
}


function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price.toFixed(2)}`;
        cartItems.appendChild(li);
        total += product.price;
    });

    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}


document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateCart();
});
