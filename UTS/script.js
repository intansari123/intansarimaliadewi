document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout');
    const clearCartButton = document.getElementById('clear-cart');

    let total = 0;
    const cart = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const product = button.parentElement;
            const productName = product.querySelector('h2').textContent;
            const productPrice = parseInt(product.querySelector('p').textContent.replace('Harga: Rp ', '').replace(',', ''));

            const existingCartItem = cart.find(item => item.name === productName);

            if (existingCartItem) {
                existingCartItem.quantity += 1;
                existingCartItem.price = existingCartItem.quantity * productPrice;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            updateCartDisplay();
        });
    });

    function updateCartDisplay() {
        total = 0;
        cartItems.innerHTML = '';

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${item.name}
                <span>Rp ${item.price.toFixed(2)} x${item.quantity}</span>
                <button class="remove-from-cart">Hapus</button>
                <button class="decrement-item">-</button>
                <span class="item-quantity">${item.quantity}</span>
                <button class="increment-item">+</button>
            `;

            cartItems.appendChild(listItem);

            total += item.price;

            const removeButton = listItem.querySelector('.remove-from-cart');
            removeButton.addEventListener('click', function () {
                total -= item.price;
                cartTotal.textContent = `Rp ${total.toFixed(2)}`;
                cart.splice(cart.indexOf(item), 1);
                listItem.parentElement.removeChild(listItem);
                updateCartDisplay();
            });

            const decrementButton = listItem.querySelector('.decrement-item');
            decrementButton.addEventListener('click', function () {
                if (item.quantity > 1) {
                    item.quantity--;
                    item.price -= item.price / (item.quantity + 1);
                    total -= item.price / (item.quantity + 1);
                    cartTotal.textContent = `Rp ${total.toFixed(2)}`;
                    listItem.querySelector('.item-quantity').textContent = item.quantity;
                }
                updateCartDisplay();
            });

            const incrementButton = listItem.querySelector('.increment-item');
            incrementButton.addEventListener('click', function () {
                item.quantity++;
                item.price += item.price / (item.quantity - 1);
                total += item.price / (item.quantity - 1);
                cartTotal.textContent = `Rp ${total.toFixed(2)}`;
                listItem.querySelector('.item-quantity').textContent = item.quantity;
                updateCartDisplay();
            });
        });

        cartTotal.textContent = `Rp ${total.toFixed(2)}`;
    }

    checkoutButton.addEventListener('click', function () {
        alert(`Total pembayaran: Rp ${total.toFixed(2)}`);
    });

    clearCartButton.addEventListener('click', function () {
        cart.length = 0;
        total = 0;
        cartTotal.textContent = 'Rp 0.00';
        cartItems.innerHTML = '';
    });
});
