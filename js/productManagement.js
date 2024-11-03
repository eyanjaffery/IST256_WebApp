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
    return `
        <hr class="my-4">
        <div class="row mb-4 d-flex justify-content-between align-items-center">
            <div class="col-md-2 col-lg-2 col-xl-2">
                <img src="${product.image}" class="img-fluid rounded-3 product-toggle" alt="${product.description}" data-product-id="${product.id}">
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
                <h6 class="text-muted product-toggle" data-product-id="${product.id}">${product.name}</h6>
                <h6 class="mb-0">${product.author}</h6>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <select name="quantity" class="form-control form-control-sm" onchange="updateTotals()">
                    ${[...Array(10).keys()].map(i => `<option value="${i + 1}">${i + 1}</option>`).join('')}
                </select>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h6 class="mb-0 item-total" id="item-total-${product.id}" data-price="${product.price}">$ ${product.price}</h6>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
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
    $(`#description-${productId}`).slideToggle();
});

function updateQuantity(element, action) {
    const select = $(element).siblings('select[name="quantity"]');
    let quantity = parseInt(select.val());

    if (action === 'decrease' && quantity > 1) {
        quantity--;
    } else if (action === 'increase') {
        quantity++;
    }

    // Ensure quantity does not go below 1
    if (quantity < 1) {
        quantity = 1;
    }

    console.log(`Updating quantity for action: ${action}, new quantity: ${quantity}`);
    select.val(quantity);
    updateTotals();
}

function validateQuantity(select) {
    if (select.value < 1) {
        console.log('Quantity cannot be less than 1');
        $(select).addClass('shake');
        setTimeout(() => {
            $(select).removeClass('shake');
        }, 500);
        select.value = 1;
    }
    console.log(`Validated quantity: ${select.value}`);
}

function updateTotals() {
    console.log('Updating totals...');
    const cart = [];
    $('#showProducts .row').each(function () {
        const quantity = parseInt($(this).find('select[name="quantity"]').val());
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

        $(`#item-total-${item.id}`).text(`$${itemTotal.toFixed(2)}`);
    });

    console.log(`Total items: ${totalItems}, Cart total: $${cartTotal.toFixed(2)}`);
    $('#item-count').text(totalItems);
    $('#cart-total').text(`$${cartTotal.toFixed(2)}`);
}

function showCheckoutModal() {
    console.log('Showing checkout modal...');
    const cart = [];
    $('#showProducts .row').each(function () {
        const quantity = parseInt($(this).find('select[name="quantity"]').val());
        const price = parseFloat($(this).find('.item-total').attr('data-price'));
        const idAttr = $(this).find('.item-total').attr('id');

        if (idAttr) {
            const id = idAttr.split('-')[2];
            const name = $(this).find('.text-muted').text();
            const author = $(this).find('.mb-0').text();
            const image = $(this).find('img').attr('src');
            const description = $(this).find('img').attr('alt');
            const totalPrice = (quantity * price).toFixed(2);

            cart.push({ id, name, author, image, description, quantity, price: totalPrice });
        }
    });

    console.log('Cart data:', cart);
    const jsonDisplay = document.getElementById('jsonDisplay');
    jsonDisplay.textContent = JSON.stringify(cart, null, 2);
}