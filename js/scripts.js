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
    $('#shopperForm').on('input', validateForm);
    document.getElementById('shopperForm').addEventListener('submit', function (event) {
        event.preventDefault();
        if (isValid) {
            console.log(JSON.stringify(shopper));
            // Clear form after submission
            $('#shopperForm').trigger('reset');
            $('input').removeClass('valid-input');
        }
    });
});

let isValid = true;
let shopper = {};

function validateForm() {
    isValid = true;
    shopper = {
        "NAME": $('#customerName').val().trim(),
        "AGE": $('#customerAge').val(),
        "EMAIL": $('#customerEmail').val().trim(),
        "PASSWORD": $('#password').val(),
        "confirmPassword": $('#confirmPassword').val(),
        "ADDRESS": $('#customerAddress').val().trim(),
        "CITY": $('#customerCity').val().trim(),
        "STATE": $('#customerState').val().trim(),
        "ZIP": $('#customerZip').val().trim(),
        "COUNTRY": $('#customerCountry').val().trim()
    };

    // Reset all error messages
    $('.error').text('');


    // Resets validation styles
    $('input').removeClass('invalid-input valid-input');

    // Validate customer NAME
    if (shopper.NAME === "") {
        $('#customerName-error').text('Please enter your full NAME.');
        $('#customerName').addClass('invalid-input');
        isValid = false;
    } else {
        $('#customerName').addClass('valid-input');
    }

    // Validate customer AGE
    if(shopper.AGE === "" || isNaN(shopper.AGE) || shopper.AGE < 18) {
        $('#customerAge-error').text('Please enter a valid AGE.');
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
    if (shopper.PASSWORD === "") {
        $('#password-error').text('Please enter a password.');
        $('#password').addClass('invalid-input');
        isValid = false;
    } else {
        $('#password').addClass('valid-input');
    }

    // Validate confirm password
    if (shopper.confirmPassword === "" || shopper.confirmPassword !== shopper.PASSWORD) {
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
}