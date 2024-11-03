$('#cartButton').click(function(e) {
    e.preventDefault();
    window.location.href = 'productManagement.html';
});
$(document).ready(function () {
    displayProductsHome();
});
function displayProductsHome(){
    // Fetch and display products from JSON
    try{
        $.getJSON('products.json', function (products) {
            console.log('Fetched products from JSON:', products); // Log the fetched products

            // Loop through each product and display it
            const productsContainer = $('#productsListingHome');
            products.forEach(product => {
                productsContainer.append(`<div class="col mb-5">
                <div class="card h-100">
                    <!-- Book image-->
                    <img class="card-img-top" src="${product.image}" alt="${product.description}" />
                    <!-- Book details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Book title-->
                            <h5 class="fw-bolder">${product.name}</h5>
                            <!-- Author -->
                            <p>${product.author}</p>
                            <!-- Book price-->
                            ${product.price}
                        </div>
                    </div>
                    <!-- Book actions-->
                    <div type="button" class="card-footer p-4 pt-0 border-top-0 bg-transparent add-to-cart">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to Cart</a></div>
                    </div>
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
}

// Function to add item to the cart
function addToCart(product) {
    if (!product) {
        console.error('Product not found:', product);
        return;
    }

    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        console.log('Incrementing quantity for existing product:', existingProduct);
        existingProduct.quantity += 1;
    } else {
        console.log('Adding new product to cart:', product);
        product.quantity = 1;
        cart.push(product);
    }
    // Update the cart button with the new item count
    $('#total-items-cart').text(`${cart.length}`);
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
    console.log('Total price:', totalPrice);
    $('#cart-total').text(`$ ${totalPrice.toFixed(2)}`);
    $('#item-count').text(`${cart.length}`);
}