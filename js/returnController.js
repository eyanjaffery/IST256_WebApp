angular.module('shippingApp', [])
    .controller('ProductController', function ($http) {
        const vm = this;

        // Initialize fields
        vm.cart = []; // Cart items
        vm.allProducts = []; // All products fetched from JSON
        vm.loading = true; // Loading spinner flag
        vm.totalItems = 0; // Total item count
        vm.totalPrice = 0; // Total price of items
        vm.orderId = ''; // Order ID input
        vm.returnReason = ''; // Reason for return input
        vm.returnJSON = ''; // JSON to display for the return
        vm.showCartJSON = false; // Toggle visibility of JSON display

        // Fetch products from JSON file
        vm.fetchProducts = function () {
            console.log('Fetching products...');
            $http.get('assets/products.json').then(function (response) {
                vm.allProducts = response.data;
                vm.cart = [];
                vm.updateTotals();
                vm.loading = false;
                console.log('Products loaded successfully:', vm.allProducts);
            }).catch(function (error) {
                console.error('Error fetching products:', error);
                vm.loading = false;
            });
        };

        // Filter products based on search query
        vm.filterProducts = function () {
            const query = vm.searchQuery.toLowerCase();
            if (query) {
                vm.filteredProducts = vm.allProducts.filter(product =>
                    product.name.toLowerCase().includes(query) ||
                    product.author.toLowerCase().includes(query)
                );
            } else {
                vm.filteredProducts = [];
            }
        };

// Add a product to the cart
        vm.addProductToCart = function (product) {
            const existingItem = vm.cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1; // Increment quantity
                vm.updateItemTotal(existingItem);
            } else {
                // Add new product to cart
                vm.cart.push({
                    ...product,
                    quantity: 1,
                    totalPrice: product.price
                });
            }
            vm.updateTotals();
            vm.searchQuery = ""; // Clear the search box
            vm.filteredProducts = []; // Clear the dropdown
        };

        // Update item total and recalculate cart totals
        vm.updateItemTotal = function (item) {
            item.totalPrice = item.price * item.quantity;
            vm.updateTotals(); // Recalculate totals
        };

        // Calculate total items and price
        vm.updateTotals = function () {
            vm.totalItems = vm.cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
            vm.totalPrice = vm.cart.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0).toFixed(2);
            console.log('Updated totals - Total Items:', vm.totalItems, 'Total Price:', vm.totalPrice);
        };

        // Generate return JSON when "Continue" is clicked
        vm.showReturnJSON = function () {
            const returnData = {
                orderId: vm.orderId || 'UNKNOWN',
                returnProducts: vm.cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    author: item.author,
                    description: item.description,
                    quantity: item.quantity,
                    price: item.price,
                    totalPrice: item.totalPrice
                })),
                reason: vm.returnReason || 'No reason provided'
            };
            vm.returnJSON = JSON.stringify(returnData, null, 2);
            vm.showCartJSON = true; // Display JSON
            console.log('Generated Return JSON:', returnData);
        };

        // Remove a product from the cart
        vm.removeItem = function (item) {
            const index = vm.cart.indexOf(item);
            if (index > -1) {
                vm.cart.splice(index, 1);
            }
            vm.updateTotals();
        };

        // Initialize by fetching products
        vm.fetchProducts();
    });
