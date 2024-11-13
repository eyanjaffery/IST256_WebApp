// angular.module('shippingApp', [])
//     .controller('ProductController', function($http, $scope, $timeout) {
//         const vm = this;
//
//         // Initialize cart as empty
//         vm.cart = [];
//         vm.allProducts = []; // Stores all available products fetched from JSON
//         vm.loading = true;
//         vm.totalItems = 0;
//         vm.totalPrice = 0;
//
//         // Shipping form visibility and JSON display
//         vm.isShippingFormVisible = false;
//         vm.showCartJSON = false;
//         vm.showShippingJSON = false;
//
//         // Shipping details object for the form
//         vm.shippingDetails = {
//             address: '',
//             city: '',
//             state: '',
//             zip: '',
//             country: '',
//             carrier: '',
//             method: ''
//         };
//
//         // Country, State, and City dropdown data
//         vm.countries = [];
//         vm.states = [];
//         vm.cities = [];
//
//         // Fetch products from JSON file, initially clearing the cart
//         vm.fetchProducts = function() {
//             console.log('Fetching products...');
//             $http.get('assets/products.json').then(function(response) {
//                 vm.allProducts = response.data; // Store all products for selection
//                 console.log('Available products:', vm.allProducts);
//                 vm.cart = []; // Ensure cart starts empty
//                 vm.updateTotals(); // Initialize totals
//                 vm.loading = false;
//             }).catch(function(error) {
//                 console.error('Error fetching products:', error);
//                 vm.loading = false;
//             });
//         };
//
//         // Load countries, states, and cities from local JSON file
//         vm.loadLocationData = function() {
//             $http.get('assets/countries+states+cities.json').then(function(response) {
//                 vm.locationData = response.data;
//                 vm.countries = vm.locationData.map(country => ({
//                     name: country.name,
//                     iso2: country.iso2,
//                     states: country.states // Store states within the country for easy access later
//                 }));
//                 console.log('Loaded location data:', vm.countries);
//             }).catch(function(error) {
//                 console.error('Error loading location data:', error);
//             });
//         };
//
//         // Update states based on selected country
//         vm.updateStates = function() {
//             vm.states = []; // Clear previous states when country changes
//             vm.cities = []; // Clear previous cities when country changes
//             const selectedCountry = vm.countries.find(country => country.iso2 === vm.shippingDetails.country);
//             if (selectedCountry && selectedCountry.states) {
//                 vm.states = selectedCountry.states.map(state => ({
//                     name: state.name,
//                     iso2: state.iso2,
//                     cities: state.cities // Store cities within the state for easy access later
//                 }));
//                 console.log(`States for ${selectedCountry.name}:`, vm.states);
//             }
//         };
//
//         // Update cities based on selected state
//         vm.updateCities = function() {
//             vm.cities = []; // Clear previous cities when state changes
//             const selectedState = vm.states.find(state => state.iso2 === vm.shippingDetails.state);
//             if (selectedState && selectedState.cities) {
//                 vm.cities = selectedState.cities.map(city => city.name);
//                 console.log(`Cities for ${selectedState.name}:`, vm.cities);
//             }
//         };
//
//         // Validate ZIP code format (5 digits or 5+4 digits with hyphen)
//         vm.isValidZip = function(zip) {
//             const zipPattern = /^\d{5}(-\d{4})?$/;
//             return zipPattern.test(zip);
//         };
//
//         // Add selected product to cart
//         vm.addToCart = function(productId) {
//             const selectedProduct = vm.allProducts.find(product => product.id === productId);
//             if (selectedProduct) {
//                 const existingItem = vm.cart.find(item => item.id === productId);
//
//                 if (existingItem) {
//                     existingItem.quantity += 1; // Increment quantity if already in cart
//                     vm.updateItemTotal(existingItem);
//                     console.log(`Increased quantity for ${existingItem.name} to ${existingItem.quantity}`);
//                 } else {
//                     const newItem = {
//                         ...selectedProduct,
//                         quantity: 1, // Start with quantity of 1
//                         totalPrice: selectedProduct.price // Initial total price per item
//                     };
//                     vm.cart.push(newItem);
//                     console.log(`Added new product to cart: ${newItem.name}`);
//                 }
//                 vm.updateTotals(); // Recalculate totals after adding item
//             }
//         };
//
//         // Update total price for each item in cart
//         vm.updateItemTotal = function(item) {
//             item.totalPrice = item.price * item.quantity;
//             vm.updateTotals(); // Recalculate cart totals
//         };
//
//         // Remove an item from the cart
//         vm.removeItem = function(item) {
//             console.log(`Removing item from cart: ${item.name}`);
//             const index = vm.cart.indexOf(item);
//             if (index > -1) {
//                 vm.cart.splice(index, 1);
//                 console.log(`Item ${item.name} removed successfully.`);
//                 vm.updateTotals(); // Update totals after item removal
//             }
//         };
//
//         // Calculate total items and total price for the cart
//         vm.updateTotals = function() {
//             // Ensure totalItems sums the quantities as numbers
//             vm.totalItems = vm.cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
//
//             // Calculate totalPrice by summing each item's totalPrice
//             vm.totalPrice = vm.cart.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0).toFixed(2);
//
//             console.log(`Updated cart totals: Total Items = ${vm.totalItems}, Total Price = $${vm.totalPrice}`);
//         };
//
//         // Display checkout JSON directly on the page
//         vm.showCheckoutJSON = function() {
//             const checkoutData = vm.cart.map(item => ({
//                 id: item.id,
//                 name: item.name,
//                 author: item.author,
//                 image: item.image,
//                 description: item.description,
//                 quantity: item.quantity,
//                 price: item.price,
//                 totalPrice: (item.price * item.quantity).toFixed(2)
//             }));
//             vm.checkoutJSON = JSON.stringify(checkoutData, null, 2);
//             vm.showCartJSON = true; // Display JSON directly on the page
//             console.log('Checkout JSON Data:', checkoutData);
//             vm.showShippingForm(); // Scroll to the shipping form
//         };
//
//         // Function to show the shipping form and scroll to it
//         vm.showShippingForm = function() {
//             console.log('Showing shipping form...');
//             vm.isShippingFormVisible = true;
//
//             // Use $timeout to ensure Angular has rendered the element before scrolling
//             $timeout(function() {
//                 const shippingSection = document.getElementById('shipping-section');
//                 if (shippingSection) {
//                     shippingSection.scrollIntoView({ behavior: 'smooth' });
//                 }
//             }, 0);
//         };
//
//         // Submit the shipping form and display JSON output
//         vm.submitShipping = function() {
//             console.log('Submitting shipping details...');
//             if (vm.shippingDetails.address && vm.shippingDetails.city && vm.shippingDetails.state &&
//                 vm.isValidZip(vm.shippingDetails.zip) && vm.shippingDetails.country &&
//                 vm.shippingDetails.carrier && vm.shippingDetails.method) {
//                 vm.showShippingJSON = true;
//                 console.log('Shipping details submitted successfully:', vm.shippingDetails);
//             } else {
//                 alert("Please fill in all required fields with valid information.");
//                 console.warn('Submission failed. Missing or invalid fields in shipping details.');
//             }
//         };
//
//         // Fetch products and load location data on initialization
//         console.log('Initializing product controller...');
//         vm.fetchProducts();
//         vm.loadLocationData(); // Load countries, states, and cities from local JSON
//     });