/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
// scripts.js

/// Check if the form exists on the page and scroll to it when the page loads
$(document).ready(function() {
    // Check if the "scrollUpForm" exists
    if ($('#scrollUp').length) {
        // Smooth scroll to the form section when the page loads
        $('html, body').animate({
            scrollTop: $('#scrollUp').offset().top
        }, 200);  // Scroll duration in milliseconds
    }
});

function validateForm(event){
    let isValid = true;

    // Debugging: Check if the form validation is triggered
    console.log("Form validation triggered!");

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

    // Debugging: Log collected form values
    console.log({
        customerName,
        customerAge,
        customerEmail,
        password,
        confirmPassword,
        customerAddress,
        customerCity,
        customerState,
        customerZip,
        customerCountry,
    });

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

    // Reset all error messages
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

    // Validate customer name
    if (customerName === "") {
        customerNameError.text('Please enter your full name.');
        isValid = false;
    }

    // Validate age (must be 18+)
    if (customerAge === "" || isNaN(customerAge) || parseInt(customerAge) < 18) {
        customerAgeError.text('You must be 18 years or older.');
        isValid = false;
    }

    // Basic email regex validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (customerEmail === "" || !emailPattern.test(customerEmail)) {
        customerEmailError.text('Please enter a valid email address.');
        isValid = false;
    }

    // Validate password
    if (password === "") {
        passwordError.text('Please enter a password.');
        isValid = false;
    }

    // Validate confirm password
    if (confirmPassword === "" || confirmPassword !== password) {
        confirmPasswordError.text('Passwords do not match.');
        isValid = false;
    }

    // Validate address
    if (customerAddress === "") {
        customerAddressError.text('Please enter your address.');
        isValid = false;
    }

    // Validate city
    if (customerCity === "") {
        customerCityError.text('Please enter your city.');
        isValid = false;
    }

    // Validate state
    if (customerState === "") {
        customerStateError.text('Please enter your state.');
        isValid = false;
    }

    // Validate ZIP code (ensure it's a number)
    if (customerZip === "" || isNaN(customerZip)) {
        customerZipError.text('Please enter a valid ZIP code.');
        isValid = false;
    }

    // Validate country
    if (customerCountry === "") {
        customerCountryError.text('Please enter your country.');
        isValid = false;
    }

    // If validation fails, prevent form submission
    if (!isValid) {
        event.preventDefault();  // Prevent submission if any field is invalid
        console.log("Validation failed. Form not submitted.");
    } else {
        // Log form data to console in JSON format
        const formData = {
            customerName,
            customerAge,
            customerEmail,
            customerAddress,
            customerCity,
            customerState,
            customerZip,
            customerCountry,
        };

        console.log("Form Data Submitted:", formData);
    }
}