let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart from localStorage, or initialize an empty array

// Function to update the cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
    localStorage.setItem('cart', JSON.stringify(cart)); // Save the cart to localStorage
}

// Function to update the cart modal content
function updateCartModal() {
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

// Function to open the cart modal
function openCartModal() {
    updateCartModal();
    document.getElementById('cart-modal').style.display = 'block';
}

// Function to close the cart modal
function closeCartModal() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Function to add a product to the cart
function addToCart(product) {
    cart.push(product);
    updateCartCount(); // Update the cart icon count
}

// Function to remove a product from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount(); // Update the cart icon count
    updateCartModal(); // Update the modal content
}

// Event listener for all "Add to Cart" buttons
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

// Open the cart modal when clicking the cart icon
document.getElementById('cart-icon').addEventListener('click', openCartModal);

// Close the cart modal when clicking the close button
document.getElementById('close-modal-btn').addEventListener('click', closeCartModal);

// Initialize the cart count
updateCartCount();
