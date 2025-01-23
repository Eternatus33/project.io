let cart = []; // Array to store cart items

// Function to update the cart count on the icon
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length;  // Update cart icon with the number of items
}

// Function to add an item to the cart
function addToCart(product) {
    cart.push(product);
    updateCartCount();  // Update cart count whenever an item is added
    console.log(cart);  // Log cart contents (can be used for testing)
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

        addToCart(product);  // Add product to the cart
        alert(`${productName} has been added to your cart!`);  // Alert the user
    });
});
