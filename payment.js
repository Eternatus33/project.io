document.addEventListener('DOMContentLoaded', () => {
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const paymentDetails = {
        'credit-card': document.getElementById('credit-card-details'),
        'paypal': document.getElementById('paypal-details'),
        'other': document.getElementById('other-details')
    };

    // Show the corresponding payment details when a method is selected
    paymentMethods.forEach(method => {
        method.addEventListener('change', (event) => {
            for (const key in paymentDetails) {
                paymentDetails[key].style.display = 'none'; // Hide all details
            }
            const selectedMethod = event.target.id;
            if (paymentDetails[selectedMethod]) {
                paymentDetails[selectedMethod].style.display = 'block'; // Show selected details
            }
        });
    });

    // Handle form submission
    document.getElementById('payment-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Payment confirmed! Thank you for your purchase.');
        // Redirect to a confirmation page or perform further actions
    });
});
