// Initialize cart items from localStorage or set as an empty array
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to add an item to the cart
function addToCart(itemId, itemName, itemPrice, itemImg) {
    // Check if the item already exists in the cart
    const existingItem = cartItems.find(item => item.id === itemId);
    if (existingItem) {
        alert(`${itemName} is already in your cart.`);
        return;
    }

    // Add the new item to the cart
    const newItem = {
        id: itemId,
        name: itemName,
        price: itemPrice,
        img: itemImg
    };
    cartItems.push(newItem);

    // Save the updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Alert the user
    alert(`${itemName} has been added to your cart.`);
}

// Function to render cart items on the checkout page
function renderCartItems() {
    const cartItemsList = document.getElementById('cart-items-list');
    cartItemsList.innerHTML = ''; // Clear the existing content

    // Retrieve the cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    let total = 0;

    // Loop through each item and create HTML structure
    storedCartItems.forEach(item => {
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
    if (storedCartItems.length === 0) {
        cartItemsList.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceElement.textContent = `$0.00`;
    }
}

// Function to remove an item from the cart
function removeItem(itemId) {
    // Retrieve cart items from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Remove the item with the matching ID
    const updatedCart = storedCartItems.filter(item => item.id !== itemId);

    // Update localStorage with the updated cart
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));

    // Re-render the cart items
    renderCartItems();
}

// Function to handle the checkout button
function handleCheckout() {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (storedCartItems.length === 0) {
        alert('Your cart is empty. Please add items to proceed.');
        return;
    }

    // Proceed to checkout (Replace this with your actual checkout logic)
    alert('Proceeding to payment...');
    // Example: Redirect to payment page
    window.location.href = 'payment.html';
}

// Attach event listener to the checkout button
const checkoutButton = document.getElementById('checkout-btn');
if (checkoutButton) {
    checkoutButton.addEventListener('click', handleCheckout);
}

// Initial rendering of cart items on the checkout page
if (document.getElementById('cart-items-list')) {
    renderCartItems();
}
