// Sample cart data (You can replace this with data from a backend or localStorage)
let cartItems = [
    { id: 1, name: 'Watch 1', price: 200, img: 'watch1.jpg' },
    { id: 2, name: 'Watch 2', price: 500, img: 'watch2.jpg' },
    { id: 3, name: 'Watch 3', price: 100, img: 'watch3.jpg' }
];

// Function to render cart items
function renderCartItems() {
    const cartItemsList = document.getElementById('cart-items-list');
    cartItemsList.innerHTML = ''; // Clear the existing content

    let total = 0; // Total price calculation

    // Loop through each item and create HTML structure
    cartItems.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        cartItemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Price: $${item.price}</p>
            </div>
            <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
        `;

        cartItemsList.appendChild(cartItemDiv);
        total += item.price;
    });

    // Update the total price
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = `$${total.toFixed(2)}`;

    // Show a message if the cart is empty
    if (cartItems.length === 0) {
        cartItemsList.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceElement.textContent = `$0.00`;
    }
}

// Function to remove an item from the cart
function removeItem(itemId) {
    // Remove the item with the matching ID from the cartItems array
    cartItems = cartItems.filter(item => item.id !== itemId);

    // Re-render the cart items
    renderCartItems();
}

// Function to handle the checkout button
function handleCheckout() {
    if (cartItems.length === 0) {
        alert('Your cart is empty. Please add items to proceed.');
        return;
    }

    // Proceed to checkout (Replace this with your actual checkout logic)
    alert('Proceeding to payment...');
    // Example: Redirect to payment page
    window.location.href = 'payment.html';
}

// Attach event listener to the checkout button
document.getElementById('checkout-btn').addEventListener('click', handleCheckout);

// Initial rendering of the cart items
renderCartItems();
