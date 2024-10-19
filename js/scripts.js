/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
// scripts.js

$(document).ready(function() {
    // Check if the "scrollUpForm" exists and scroll to it when page loads
    if ($('#scrollUp').length) {
        $('html, body').animate({
            scrollTop: $('#scrollUp').offset().top
        }, 200);  // Scroll duration in milliseconds
    }

    // Attach real-time validation to each input field
    $('#customerName, #customerAge, #customerEmail, #password, #confirmPassword, #customerAddress, #customerCity, #customerState, #customerZip, #customerCountry').on('input', validateForm);
});

function validateForm(event) {

    let isValid = true;

    // Collect form values
    const customerName = $('#customerName').val().trim();
    const customerAge = $('#customerAge').val();
    const customerEmail = $('#customerEmail').val().trim();
    const password = $('#password').val();
    const confirmPassword = $('#confirmPassword').val();
    const customerAddress = $('#customerAddress').val().trim();
    const customerCity = $('#customerCity').val().trim();
    const customerState = $('#customerState').val().trim();
    const customerZip = $('#customerZip').val().trim();
    const customerCountry = $('#customerCountry').val().trim();

    // Error elements
    const customerNameError = $('#customerName-error');
    const customerAgeError = $('#customerAge-error');
    const customerEmailError = $('#customerEmail-error');
    const passwordError = $('#password-error');
    const confirmPasswordError = $('#confirmPassword-error');
    const customerAddressError = $('#customerAddress-error');
    const customerCityError = $('#customerCity-error');
    const customerStateError = $('#customerState-error');
    const customerZipError = $('#customerZip-error');
    const customerCountryError = $('#customerCountry-error');

    // Input elements
    const customerNameInput = $('#customerName');
    const customerAgeInput = $('#customerAge');
    const customerEmailInput = $('#customerEmail');
    const passwordInput = $('#password');
    const confirmPasswordInput = $('#confirmPassword');
    const customerAddressInput = $('#customerAddress');
    const customerCityInput = $('#customerCity');
    const customerStateInput = $('#customerState');
    const customerZipInput = $('#customerZip');
    const customerCountryInput = $('#customerCountry');

    // Reset all error messages and input field classes
    customerNameError.text('');
    customerAgeError.text('');
    customerEmailError.text('');
    passwordError.text('');
    confirmPasswordError.text('');
    customerAddressError.text('');
    customerCityError.text('');
    customerStateError.text('');
    customerZipError.text('');
    customerCountryError.text('');

    $('input').removeClass('invalid-input valid-input'); // Remove both classes from all inputs

    // Validate customer name
    if (customerName === "") {
        customerNameError.text('Please enter your full name.');
        customerNameInput.addClass('invalid-input');
        isValid = false;
    } else {
        customerNameInput.addClass('valid-input');
    }

    // Validate age (must be 18+)
    if (customerAge === "" || isNaN(customerAge) || parseInt(customerAge) < 18) {
        customerAgeError.text('You must be 18 years or older.');
        customerAgeInput.addClass('invalid-input');
        isValid = false;
    } else {
        customerAgeInput.addClass('valid-input');
    }

    // Basic email regex validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (customerEmail === "" || !emailPattern.test(customerEmail)) {
        customerEmailError.text('Please enter a valid email address.');
        customerEmailInput.addClass('invalid-input');
        isValid = false;
    } else {
        customerEmailInput.addClass('valid-input');
    }

    // Validate password
    if (password === "") {
        passwordError.text('Please enter a password.');
        passwordInput.addClass('invalid-input');
        isValid = false;
    } else {
        passwordInput.addClass('valid-input');
    }

    // Validate confirm password
    if (confirmPassword === "" || confirmPassword !== password) {
        confirmPasswordError.text('Passwords do not match.');
        confirmPasswordInput.addClass('invalid-input');
        isValid = false;
    } else {
        confirmPasswordInput.addClass('valid-input');
    }

    // Validate address
    if (customerAddress === "") {
        customerAddressError.text('Please enter your address.');
        customerAddressInput.addClass('invalid-input');
        isValid = false;
    } else {
        customerAddressInput.addClass('valid-input');
    }

    // Validate city
    if (customerCity === "") {
        customerCityError.text('Please enter your city.');
        customerCityInput.addClass('invalid-input');
        isValid = false;
    } else {
        customerCityInput.addClass('valid-input');
    }

    // Validate state
    if (customerState === "") {
        customerStateError.text('Please enter your state.');
        customerStateInput.addClass('invalid-input');
        isValid = false;
    } else {
        customerStateInput.addClass('valid-input');
    }

    // Validate ZIP code (ensure it's a number)
    if (customerZip === "" || isNaN(customerZip)) {
        customerZipError.text('Please enter a valid ZIP code.');
        customerZipInput.addClass('invalid-input');
        isValid = false;
    } else {
        customerZipInput.addClass('valid-input');
    }

    // Validate country
    if (customerCountry === "") {
        customerCountryError.text('Please enter your country.');
        customerCountryInput.addClass('invalid-input');
        isValid = false;
    } else {
        customerCountryInput.addClass('valid-input');
    }

    // If real-time validation, we don't need to prevent form submission yet
    if (event.type === "submit" && !isValid) {
        event.preventDefault();  // Prevent submission if any field is invalid
        console.log("Validation failed. Form not submitted.");
    }
}
