angular.module('shippingApp', [])
    .controller('ProductController', function($http, $scope, $timeout) {
        const vm = this;

        // Initialize cart, shipping, and billing details
        vm.cart = [];
        vm.allProducts = [];
        vm.loading = true;
        vm.totalItems = 0;
        vm.totalPrice = 0;

        // Flags for visibility and JSON display
        vm.isShippingFormVisible = false;
        vm.isBillingFormVisible = false;
        vm.showCartJSON = false;
        vm.showJSON = false;
        vm.showBillingJSON = false;

        // Error messages for form validation
        vm.shippingErrorMessage = '';
        vm.billingErrorMessage = '';

        // Validation flags (initialized as true to prevent showing errors initially)
        vm.emailValid = true;
        vm.cardNumberValid = true;
        vm.expiryDateValid = true;
        vm.cvvValid = true;

        // Shipping and billing details objects
        vm.shippingDetails = {
            address: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            carrier: '',
            method: ''
        };

        vm.billingDetails = {
            name: '',
            email: '',
            cardNumber: '',
            expiryDate: '',
            cvv: ''
        };

        // Generate a unique order number based on current timestamp
        vm.generateOrderNumber = function() {
            const date = new Date();
            return `ORDER-${date.getTime()}`;
        }

        // Fetch products from JSON file
        vm.fetchProducts = function() {
            console.log('Fetching products...');
            $http.get('assets/products.json').then(function(response) {
                vm.allProducts = response.data;
                vm.cart = [];
                vm.updateTotals();
                vm.loading = false;
                console.log('Products loaded successfully:', vm.allProducts);
            }).catch(function(error) {
                console.error('Error fetching products:', error);
                vm.loading = false;
            });
        };

        // Update item total and recalculate cart totals
        vm.updateItemTotal = function(item) {
            item.totalPrice = item.price * item.quantity;
            vm.updateTotals(); // Recalculate totals after each quantity change
        };

        vm.updateTotals = function() {
            // Sum quantities for total items and calculate total price
            vm.totalItems = vm.cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
            vm.totalPrice = vm.cart.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0).toFixed(2);
            console.log('Updated totals - Total Items:', vm.totalItems, 'Total Price:', vm.totalPrice);
        };

        // Show checkout JSON and open shipping form
        vm.showCheckoutJSON = function() {
            console.log('Showing checkout JSON...');
            const checkoutData = vm.cart.map(item => ({
                id: item.id,
                name: item.name,
                author: item.author,
                description: item.description,
                quantity: item.quantity,
                price: item.price,
                totalPrice: (item.price * item.quantity).toFixed(2)
            }));
            vm.checkoutJSON = JSON.stringify(checkoutData, null, 2);
            vm.showCartJSON = true;
            vm.isShippingFormVisible = true;
            $timeout(function() {
                const shippingSection = document.getElementById('shipping-section');
                if (shippingSection) {
                    shippingSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 0);
        };

        // Validate shipping details
        vm.validateShippingDetails = function() {
            console.log('Validating shipping details...');
            const { address, city, state, zip, country, carrier, method } = vm.shippingDetails;
            if (!address || !city || !state || !zip || !country || !carrier || !method) {
                vm.shippingErrorMessage = "Please fill in all required shipping fields.";
                console.warn(vm.shippingErrorMessage);
                return false;
            }
            const zipPattern = /^\d{5}(-\d{4})?$/;
            if (!zipPattern.test(zip)) {
                vm.shippingErrorMessage = "Invalid ZIP code format.";
                console.warn(vm.shippingErrorMessage);
                return false;
            }
            vm.shippingErrorMessage = ''; // Clear error message if valid
            console.log('Shipping details validated successfully');
            return true;
        };

        // Triggered by ng-blur on billing fields
        vm.validateEmail = function() {
            console.log('Validating email...');
            if (vm.billingDetails.email) {
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                vm.emailValid = emailPattern.test(vm.billingDetails.email);
                console.log('Email validation:', vm.emailValid);
            } else {
                vm.emailValid = true; // Reset validation if field is empty
            }
        };

        vm.validateCardNumber = function() {
            console.log('Validating card number...');
            if (vm.billingDetails.cardNumber) {
                const cardPattern = /^\d{16}$/;
                vm.cardNumberValid = cardPattern.test(vm.billingDetails.cardNumber);
                console.log('Card number validation:', vm.cardNumberValid);
            } else {
                vm.cardNumberValid = true; // Reset validation if field is empty
            }
        };

        vm.validateExpiryDate = function() {
            console.log('Validating expiry date...');
            if (vm.billingDetails.expiryDate) {
                const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
                vm.expiryDateValid = expiryPattern.test(vm.billingDetails.expiryDate);
                console.log('Expiry date validation:', vm.expiryDateValid);
            } else {
                vm.expiryDateValid = true; // Reset validation if field is empty
            }
        };

        vm.validateCvv = function() {
            console.log('Validating CVV...');
            if (vm.billingDetails.cvv) {
                const cvvPattern = /^\d{3}$/;
                vm.cvvValid = cvvPattern.test(vm.billingDetails.cvv);
                console.log('CVV validation:', vm.cvvValid);
            } else {
                vm.cvvValid = true; // Reset validation if field is empty
            }
        };

        // Submit shipping form and show billing section
        vm.submitShipping = function() {
            if (vm.validateShippingDetails()) {
                vm.isBillingFormVisible = true;
                vm.showShippingJSON = true;
                $timeout(function() {
                    const billingSection = document.getElementById('billing-section');
                    if (billingSection) {
                        billingSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 0);
            }
        };

        // Validate billing form on final submit
        vm.submitBilling = function() {
            if (vm.emailValid && vm.cardNumberValid && vm.expiryDateValid && vm.cvvValid) {
                console.log('All billing details validated successfully');
                vm.showBillingJSON = true;
                vm.finalizeOrder();
            } else {
                vm.billingErrorMessage = "Please correct errors in the billing details.";
                console.warn(vm.billingErrorMessage);
            }
        };

        // Finalize the order: Collect all data, create order number, and send JSON to server
        vm.finalizeOrder = function() {
            const orderNumber = vm.generateOrderNumber();

            // Prepare JSON data for the entire order
            const orderData = {
                orderNumber: orderNumber,
                cart: vm.cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    author: item.author,
                    description: item.description,
                    quantity: item.quantity,
                    price: item.price,
                    totalPrice: item.totalPrice
                })),
                shippingDetails: vm.shippingDetails,
                billingDetails: vm.billingDetails,
                totalItems: vm.totalItems,
                totalPrice: vm.totalPrice
            };

            console.log('Submitting order data to server:', orderData);
            $http.post('http://130.203.136.203:3001/api/order', orderData)
                .then(function(response) {
                    console.log('Order submitted successfully:', response.data);
                    alert(`Order ${orderNumber} has been successfully submitted!`);
                    vm.resetForms();
                })
                .catch(function(error) {
                    console.error('Error submitting order:', error);
                    alert('There was an error processing your order. Please try again.');
                });
        };

        // Reset form fields
        vm.resetForms = function() {
            console.log('Resetting forms and clearing data...');
            vm.cart = [];
            vm.shippingDetails = {
                address: '',
                city: '',
                state: '',
                zip: '',
                country: '',
                carrier: '',
                method: ''
            };
            vm.billingDetails = {
                name: '',
                email: '',
                cardNumber: '',
                expiryDate: '',
                cvv: ''
            };
            vm.totalItems = 0;
            vm.totalPrice = 0;
            vm.isShippingFormVisible = false;
            vm.isBillingFormVisible = false;
            vm.showCartJSON = false;
            vm.showShippingJSON = false;
            vm.showBillingJSON = false;
            vm.shippingErrorMessage = '';
            vm.billingErrorMessage = '';
            console.log('Form reset complete');
        };

        // Initialize by fetching products
        vm.fetchProducts();
    });