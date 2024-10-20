/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
/*
  IST 256 - Web Application Group Project
  Group: 7
  Members:
  - Eyan Jaffery
  - Michael Litka
  - Jeffery Gaskin
*/
$(document).ready(function() {
    // Check if the "scrollUpForm" exists and scroll to it when page loads
    let scrollUp = $('scrollUp');
    let shopperForm = $('#shopperForm');
    if (scrollUp.length) {
        $('html, body').animate({
            scrollTop: scrollUp.offset().top
        }, 200);  // Scroll duration in milliseconds
    }

    // Attach real-time validation to the form inputs
    shopperForm.on('input', validateForm);

    // Attach the submit event using jQuery
    shopperForm.on('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting

        if (validateForm()) {
            console.log(JSON.stringify(collectFormData()));  // Log the form data if valid
            // Clear form after submission
            $('#shopperForm').trigger('reset');
            $('input').removeClass('valid-input');
        }
    });
});

// Function to validate the form
function validateForm() {
    let isValid = true;

    // Collect form values into an object (excluding confirmPassword)
    let shopper = collectFormData();
    let confirmPassword = $('#confirmPassword').val();  // Only used for verification

    // Reset all error messages
    $('.error').text('');

    // Resets validation styles
    $('input').removeClass('invalid-input valid-input');

    // Validate customer name
    if (shopper.NAME === "") {
        $('#customerName-error').text('Please enter your full name.');
        $('#customerName').addClass('invalid-input');
        isValid = false;
    } else {
        $('#customerName').addClass('valid-input');
    }

    // Validate customer age
    if (shopper.AGE === "" || isNaN(shopper.AGE) || shopper.AGE < 18) {
        $('#customerAge-error').text('Please enter a valid age.');
        $('#customerAge').addClass('invalid-input');
        isValid = false;
    } else {
        $('#customerAge').addClass('valid-input');
    }

    // Basic email regex validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (shopper.EMAIL === "" || !emailPattern.test(shopper.EMAIL)) {
        $('#customerEmail-error').text('Please enter a valid email address.');
        $('#customerEmail').addClass('invalid-input');
        isValid = false;
    } else {
        $('#customerEmail').addClass('valid-input');
    }

    // Validate password
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (shopper.PASSWORD === "" || !passwordPattern.test(shopper.PASSWORD)) {
        $('#password-error').text('Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase, and one lowercase letter.');
        $('#password').addClass('invalid-input');
        isValid = false;
    } else {
        $('#password').addClass('valid-input');
    }

    // Validate confirm password (but do not store it)
    if (confirmPassword === "" || confirmPassword !== shopper.PASSWORD) {
        $('#confirmPassword-error').text('Passwords do not match.');
        $('#confirmPassword').addClass('invalid-input');
        isValid = false;
    } else {
        $('#confirmPassword').addClass('valid-input');
    }

    // Validate address
    if (shopper.ADDRESS === "") {
        $('#customerAddress-error').text('Please enter your address.');
        $('#customerAddress').addClass('invalid-input');
        isValid = false;
    } else {
        $('#customerAddress').addClass('valid-input');
    }

    // Validate city
    if (shopper.CITY === "") {
        $('#customerCity-error').text('Please enter your city.');
        $('#customerCity').addClass('invalid-input');
        isValid = false;
    } else {
        $('#customerCity').addClass('valid-input');
    }

    // Validate state
    if (shopper.STATE === "") {
        $('#customerState-error').text('Please enter your state.');
        $('#customerState').addClass('invalid-input');
        isValid = false;
    } else {
        $('#customerState').addClass('valid-input');
    }

    // Validate ZIP code
    if (shopper.ZIP === "" || isNaN(shopper.ZIP)) {
        $('#customerZip-error').text('Please enter a valid ZIP code.');
        $('#customerZip').addClass('invalid-input');
        isValid = false;
    } else {
        $('#customerZip').addClass('valid-input');
    }

    // Validate country
    if (shopper.COUNTRY === "") {
        $('#customerCountry-error').text('Please enter your country.');
        $('#customerCountry').addClass('invalid-input');
        isValid = false;
    } else {
        $('#customerCountry').addClass('valid-input');
    }

    return isValid;  // Return true if the form is valid, false otherwise
}

// Function to collect form data into an object (excluding confirmPassword)
function collectFormData() {
    return {
        "NAME": $('#customerName').val().trim(),
        "AGE": $('#customerAge').val().trim(),
        "EMAIL": $('#customerEmail').val().trim(),
        "PASSWORD": $('#password').val(),
        "ADDRESS": $('#customerAddress').val().trim(),
        "CITY": $('#customerCity').val().trim(),
        "STATE": $('#customerState').val().trim(),
        "ZIP": $('#customerZip').val().trim(),
        "COUNTRY": $('#customerCountry').val().trim()
    };
}