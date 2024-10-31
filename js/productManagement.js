$(document).ready(function () {
    console.log('Document ready and jQuery loaded successfully.'); // Confirm that jQuery is working
    // Fetch and display products from JSON
    try{
        $.getJSON('products.json', function (products) {
            console.log('Fetched products from JSON:', products); // Log the fetched products

            // Loop through each product and display it
            const productsContainer = $('#showProducts');
            products.forEach(product => {
                productsContainer.append(`<hr class="my-4">

                                    <div class="row mb-4 d-flex justify-content-between align-items-center">
                                        <div class="col-md-2 col-lg-2 col-xl-2">
                                            <img
                                                    src="${product.image}"
                                                    class="img-fluid rounded-3" alt="${product.description}">
                                        </div>
                                        <div class="col-md-3 col-lg-3 col-xl-3">
                                            <h6 class="text-muted">${product.name}</h6>
                                            <h6 class="mb-0">${product.author}</h6>
                                        </div>
                                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                            <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2"
                                                    onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                                <i class="fas fa-minus"></i>
                                            </button>

                                            <input id="quantity-1" min="0" name="quantity" value="1" type="number"
                                                   class="form-control form-control-sm" />

                                            <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2"
                                                    onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                            <h6 class="mb-0">$ ${product.price}</h6>
                                        </div>
                                        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                            <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
                                        </div>
                                    </div>`);
            });

            // Add event listeners to the add to cart buttons
            $('.add-to-cart').click(function () {
                const productId = $(this).data('product-id');
                const product = products.find(item => item.id === productId);
                addToCart(product);

            });
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
});

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
window.updateQuantity = function (productId, action) {
    const product = cart.find(item => item.id === productId);
    if (!product) return;

    switch (action) {
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
window.removeItem = function (productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}