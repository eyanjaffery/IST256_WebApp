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
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to Cart</a></div>
                    </div>
                </div>
            </div>`);
            });

            // Add event listeners to the add to cart buttons
            $('.add-to-cart').click(function () {
                let totalItems = $('total-items-cart').val().trim();
                const productId = $(this).data('product-id');
                const product = products.find(item => item.id === productId);
                addToCart(product);
            });
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}