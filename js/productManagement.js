$(document).ready(function () {
    console.log('Document ready and jQuery loaded successfully.');
    fetchProducts();
});

function fetchProducts() {
    console.log('Fetching products...');
    $('#loadingSpinner').show(); // Show the spinner

    $.getJSON('products.json', function (products) {
        console.log('Fetched products from JSON:', products);
        displayProducts(products);
        updateTotals(); // Call updateTotals after displaying products
    }).fail(function (error) {
        console.error('Error fetching products:', error);
    }).always(function () {
        $('#loadingSpinner').hide(); // Hide the spinner after the fetch operation is complete
    });
}

function displayProducts(products) {
    console.log('Displaying products...');
    const productsContainer = $('#showProducts');
    products.forEach(product => {
        productsContainer.append(createProductHTML(product));
    });
}

function createProductHTML(product) {
    console.log('Creating HTML for product:', product);
    const formattedPrice = product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return `
        <hr class="my-4">
        <div class="row mb-4 d-flex justify-content-between align-items-center product-row" data-product-id="${product.id}">
            <div class="col-md-2 col-lg-2 col-xl-2">
                <img src="${product.image}" class="img-fluid rounded-3 product-toggle" alt="${product.description}" data-product-id="${product.id}">
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
                <h6 class="text-muted product-toggle" data-product-id="${product.id}">${product.name}</h6>
                <h6 class="mb-0">${product.author}</h6>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton-${product.id}" data-bs-toggle="dropdown" aria-expanded="false">
                        1
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton-${product.id}">
                        ${[...Array(10).keys()].map(i => `<li><a class="dropdown-item" href="#">${i + 1}</a></li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h6 class="mb-0 item-total" id="item-total-${product.id}" data-price="${product.price}">${formattedPrice}</h6>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <button class="btn btn-danger delete-product">&times;</button>
            </div>
        </div>
        <div class="row mb-4 product-description" id="description-${product.id}" style="display: none;">
            <div class="col-12">
                <p>${product.description}</p>
            </div>
        </div>`;
}

$(document).on('click', '.product-toggle', function () {
    const productId = $(this).data('product-id');
    console.log(`Toggling description for product ID: ${productId}`);
    $(`#description-${productId}`).slideToggle();
});

$(document).on('click', '.dropdown-item', function (event) {
    event.preventDefault(); // Prevent the default action
    const selectedValue = $(this).text();
    const dropdown = $(this).closest('.dropdown');
    console.log(`Selected quantity: ${selectedValue}`);
    dropdown.find('.dropdown-toggle').text(selectedValue);
    updateTotals();
});

$(document).on('click', '.delete-product', function () {
    const productRow = $(this).closest('.product-row');
    const productId = productRow.data('product-id');
    console.log(`Deleting product with ID: ${productId}`);
    productRow.remove();
    updateTotals();
});

function updateTotals() {
    console.log('Updating totals...');
    const cart = [];
    $('#showProducts .row').each(function () {
        const quantity = parseInt($(this).find('.dropdown-toggle').text());
        const price = parseFloat($(this).find('.item-total').attr('data-price'));
        const idAttr = $(this).find('.item-total').attr('id');

        if (idAttr) {
            const id = idAttr.split('-')[2];
            cart.push({ id, quantity, price });
        }
    });

    let totalItems = 0;
    let cartTotal = 0;
    cart.forEach(item => {
        const itemTotal = item.quantity * item.price;
        cartTotal += itemTotal;
        totalItems += item.quantity;

        console.log(`Updating item total for product ID: ${item.id}, Quantity: ${item.quantity}, Item Total: ${itemTotal}`);
        $(`#item-total-${item.id}`).text(itemTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
    });

    console.log(`Total items: ${totalItems}, Cart total: ${cartTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`);
    $('#item-count').text(totalItems);
    $('#cart-total').text(cartTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
}

function showCheckoutModal() {
    console.log('Showing checkout modal...');
    let cart = [];
    $('#showProducts .product-row').each(function () {
        let quantity = parseInt($(this).find('.dropdown-toggle').text());
        let price = parseFloat($(this).find('.item-total').attr('data-price'));
        let idAttr = $(this).find('.item-total').attr('id');

        if (idAttr) {
            let id = idAttr.split('-')[2];
            let name = $(this).find('h6.text-muted').text();
            let author = $(this).find('h6').eq(1).text();
            let image = $(this).find('img').attr('src');
            let description = $(this).find('img').attr('alt');
            let totalPrice = (quantity * price).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

            cart.push({ id, name, author, image, description, quantity, price, totalPrice });
        }
    });

    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        type: "POST",
        data: JSON.stringify(cart),
        success: function (response) {
            console.log(response);
            console.log("AJAX was successful");
            console.log(JSON.stringify(cart));
        },
        error: function () {
            console.log("AJAX failed");
        }
    });

    console.log('Cart data:', cart);
    let jsonDisplay = document.getElementById('jsonDisplay');
    jsonDisplay.textContent = JSON.stringify(cart, null, 2);
}