let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart from localStorage, or initialize an empty array

const watches = [
    { name: 'Rolex Daytona', price: 249.99, brand: 'Rolex', material: 'metal', color: 'silver', img: 'https://i.postimg.cc/Ls5Q6JCs/rolex-4807479-1280.jpg' },
    { name: 'boAt Lunar Peak Rose Edition', price: 179.99, brand: 'boAt', material: 'leather', color: 'rose', img: 'https://i.postimg.cc/xjWKXt5H/642251-IM-1.jpg" alt="Watch 3' },
    { name: 'G-Shock GA Series', price: 115.99, brand: 'G-Shock', material: 'silicone', color: 'blue', img: 'https://i.postimg.cc/66g6fRJd/dmitry-spravko-Hj6-A9-QYe5sk-unsplash-1.jpg' },
    // Add more watches here
];

// Function to display watches
function displayWatches(watches) {
    const watchesListing = document.getElementById('watches-listing');
    watchesListing.innerHTML = ''; // Clear the previous watch listings

    watches.forEach(watch => {
        const watchItem = document.createElement('div');
        watchItem.classList.add('watch-item');
        watchItem.innerHTML = `
             <img src="${watch.img}" alt="${watch.name}">
            <h3>${watch.name}</h3>
            <p>Price: $${watch.price}</p>
        `;
        watchesListing.appendChild(watchItem);
    });
}

// Filter watches based on selected filter options
function filterWatches() {
    const priceRange = document.getElementById('price-range').value;
    const priceValue = document.getElementById('price-value');
    priceValue.textContent = `$${priceRange}`;

    const selectedBrand = document.getElementById('brand').value;
    const selectedMaterial = document.getElementById('material').value;
    const selectedColor = document.getElementById('color').value;

    const filteredWatches = watches.filter(watch => {
        return (
            (selectedBrand === 'all' || watch.brand === selectedBrand) &&
            (selectedMaterial === 'all' || watch.material === selectedMaterial) &&
            (selectedColor === 'all' || watch.color === selectedColor) &&
            watch.price <= priceRange
        );
    });

    displayWatches(filteredWatches);
}

// Event listener for applying filters
document.getElementById('apply-filters').addEventListener('click', filterWatches);

// Event listener for price range input change
document.getElementById('price-range').addEventListener('input', () => {
    const priceRange = document.getElementById('price-range').value;
    document.getElementById('price-value').textContent = `$${priceRange}`;
});

// Initial display of all watches
displayWatches(watches);


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
