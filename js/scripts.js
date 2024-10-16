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
        }, 200);  // Scroll duration in milliseconds
    }
});
