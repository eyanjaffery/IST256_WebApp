angular.module('shippingApp', [])
    .controller('ProductController', function($http, $scope, $timeout) {
        const vm = this;

        // Initialize cart and shipping details
        vm.cart = [];
        vm.allProducts = []; // Stores all available products fetched from JSON
        vm.loading = true;
        vm.totalItems = 0;
        vm.totalPrice = 0;

        // Shipping form visibility and JSON display
        vm.isShippingFormVisible = false;
        vm.showCartJSON = false;
        vm.showJSON = false;

        // Shipping details object for the form
        vm.shippingDetails = {
            address: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            carrier: '',
            method: ''
        };

        // Fetch products from JSON file
        vm.fetchProducts = function() {
            console.log('Fetching products...');
            $http.get('assets/products.json').then(function(response) {
                vm.allProducts = response.data; // Store all products for selection
                console.log('Available products:', vm.allProducts);
                vm.cart = []; // Ensure cart starts empty
                vm.updateTotals(); // Initialize totals
                vm.loading = false;
            }).catch(function(error) {
                console.error('Error fetching products:', error);
                vm.loading = false;
            });
        };

        // Add selected product to cart
        vm.addToCart = function(productId) {
            const selectedProduct = vm.allProducts.find(product => product.id === productId);
            if (selectedProduct) {
                const existingItem = vm.cart.find(item => item.id === productId);

                if (existingItem) {
                    existingItem.quantity += 1; // Increment quantity if already in cart
                    vm.updateItemTotal(existingItem);
                    console.log(`Increased quantity for ${existingItem.name} to ${existingItem.quantity}`);
                } else {
                    const newItem = {
                        ...selectedProduct,
                        quantity: 1, // Start with quantity of 1
                        totalPrice: selectedProduct.price // Initial total price per item
                    };
                    vm.cart.push(newItem);
                    console.log(`Added new product to cart: ${newItem.name}`);
                }
                vm.updateTotals(); // Recalculate totals after adding item
            }
        };

        // Update total price for each item in cart
        vm.updateItemTotal = function(item) {
            item.totalPrice = item.price * item.quantity;
            vm.updateTotals(); // Recalculate cart totals
        };

        // Remove an item from the cart
        vm.removeItem = function(item) {
            console.log(`Removing item from cart: ${item.name}`);
            const index = vm.cart.indexOf(item);
            if (index > -1) {
                vm.cart.splice(index, 1);
                console.log(`Item ${item.name} removed successfully.`);
                vm.updateTotals(); // Update totals after item removal
            }
        };

        // Calculate total items and total price for the cart
        vm.updateTotals = function() {
            // Ensure totalItems sums the quantities as numbers
            vm.totalItems = vm.cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

            // Calculate totalPrice by summing each item's totalPrice
            vm.totalPrice = vm.cart.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0).toFixed(2);

            console.log(`Updated cart totals: Total Items = ${vm.totalItems}, Total Price = $${vm.totalPrice}`);
        };

        // Validate ZIP code format (5 digits or 5+4 digits with hyphen)
        vm.isValidZip = function(zip) {
            const zipPattern = /^\d{5}(-\d{4})?$/;
            return zipPattern.test(zip);
        };

        // Form validation for shipping details
        vm.validateShippingDetails = function() {
            console.log('Validating shipping details...');
            if (!vm.shippingDetails.address || !vm.shippingDetails.city || !vm.shippingDetails.state ||
                !vm.shippingDetails.zip || !vm.shippingDetails.country || !vm.shippingDetails.carrier ||
                !vm.shippingDetails.method) {
                alert("Please fill in all required fields.");
                return false;
            }

            if (!vm.isValidZip(vm.shippingDetails.zip)) {
                alert("Invalid ZIP code format.");
                return false;
            }

            return true;
        };

        // Display checkout JSON directly on the page
        vm.showCheckoutJSON = function() {
            const checkoutData = vm.cart.map(item => ({
                id: item.id,
                name: item.name,
                author: item.author,
                image: item.image,
                description: item.description,
                quantity: item.quantity,
                price: item.price,
                totalPrice: (item.price * item.quantity).toFixed(2)
            }));
            vm.checkoutJSON = JSON.stringify(checkoutData, null, 2);
            vm.showCartJSON = true;
            console.log('Checkout JSON Data:', checkoutData);
            vm.showShippingForm(); // Scroll to the shipping form
        };

        // Function to show the shipping form and scroll to it
        vm.showShippingForm = function() {
            console.log('Showing shipping form...');
            vm.isShippingFormVisible = true;

            // Use $timeout to ensure Angular has rendered the element before scrolling
            $timeout(function() {
                const shippingSection = document.getElementById('shipping-section');
                if (shippingSection) {
                    shippingSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 0);
        };

        // Submit the shipping form and display JSON output
        vm.submitShipping = function() {
            console.log('Submitting shipping details...');
            if (vm.validateShippingDetails()) {
                vm.showJSON = true;
                console.log('Shipping details submitted successfully:', vm.shippingDetails);
            }
        };

        // Fetch products on initialization
        console.log('Initializing product controller...');
        vm.fetchProducts();
    });