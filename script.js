let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart from localStorage, or initialize an empty array

// Function to update the cart count on the icon and cart section
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
    localStorage.setItem('cart', JSON.stringify(cart)); // Save the cart to localStorage
    updateCartSection();
}

// Function to update the cart section with items and total
function updateCartSection() {
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');
    
    // Clear the current list
    cartItemsList.innerHTML = '';

    let total = 0;

    // Loop through the cart and display items
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <span>${item.name} - ${item.price}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsList.appendChild(itemElement);
        
        total += parseFloat(item.price.replace('$', ''));
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to add a product to the cart
function addToCart(product) {
    cart.push(product);
    updateCartCount(); // Update the cart count and section
}

// Function to remove a product from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount(); // Update the cart count and section
}

// Event listener for all "Add to Cart" buttons (you may add it to your product display section)
document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
        const productName = document.querySelectorAll('.watch h3')[index].textContent;
        const productPrice = document.querySelectorAll('.watch p')[index].textContent;
        
        const product = {
            name: productName,
            price: productPrice
        };

        addToCart(product);
        alert(`${productName} has been added to your cart!`);
    });
});

// Initialize the cart count and cart section on page load
updateCartCount();

// Optionally, show the cart section by default or when a cart icon is clicked.
document.getElementById('cart-section').style.display = cart.length > 0 ? 'block' : 'none'; // Hide if empty
