
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}


const addToCartButtons = document.querySelectorAll('.add-to-cart');
const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');


function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    
    const product = { id, name, price: parseFloat(price) };
    cart.push(product);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}


function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    
   
    cart = cart.filter(product => product.id !== id);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
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


document.addEventListener('DOMContentLoaded', updateCart);
