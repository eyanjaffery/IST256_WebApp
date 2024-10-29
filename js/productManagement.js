$(document).ready(function() {
    console.log('Document ready and jQuery loaded successfully.'); // Confirm that jQuery is working

    // Fetch and display products from JSON
    try {
        $.getJSON('../products.json', function(products) {
            console.log('Products loaded:', products); // Log the products
            // Code to Loop through each product and display it


        });
    } catch (error) {
        console.error('Error loading products:', error); // Log any errors}
}

    // Initialize an empty cart
    let cart = [];

    // Function to add item to the cart
    function addToCart(product) {
        if (!product) {
            console.error('Product not found:', product);
            return;
        }

        // Check if the product already exists in the cart
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }
        updateCartDisplay();
    }

    // Function to update the cart display
    function updateCartDisplay() {
        console.log('Updating cart display with items:', cart); // Log the current cart contents

        // Clear the existing cart display
        const cartContainer = $('.card .p-5');
        cartContainer.find('.cart-item').remove();

        // Loop through each item in the cart and display it
        let totalPrice = 0;
        cart.forEach(item => {
            const itemTotal = (item.price * item.quantity).toFixed(2);
            totalPrice += parseFloat(itemTotal);

            cartContainer.append(`
                <!-- Add cart items and update the total price -->
            `);
        });

        // Update the total price and item count
        $('#cart-total').text(`€ ${totalPrice.toFixed(2)}`);
        $('#item-count').text(cart.length);
    }

    // Function to update the quantity of a specific item
    window.updateQuantity = function(productId, action) {
        const product = cart.find(item => item.id === productId);
        if (!product) return;

        switch(action) {
            case 'increase':
                product.quantity += 1;
                break;
            case 'decrease':
                if (product.quantity > 1) product.quantity -= 1;
                break;
            case 'input':
                // const newQuantity = parseInt($(`#quantity-${productId}`).val());
                if (newQuantity >= 1) {
                    product.quantity = newQuantity;
                } else {
                    product.quantity = 1;
                    $(`#quantity-${productId}`).val(1);
                }
                break;
        }
        updateCartDisplay();
    }

    // Function to remove an item from the cart
    window.removeItem = function(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartDisplay();
    }
});