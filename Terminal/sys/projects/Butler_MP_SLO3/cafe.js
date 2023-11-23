$(document).ready(function() {
    // Array to store image URLs for preloading
    var preloadImages = [
        'images/espresso_info.jpg',
        'images/latte_info.jpg',
        'images/cappuccino_info.jpg',
        'images/coffee_info.jpg',
        'images/biscotti_info.jpg',
        'images/scone_info.jpg'
    ];

    // Function to preload images
    function preload() {
        for (var i = 0; i < preloadImages.length; i++) {
            var img = new Image();
            img.src = preloadImages[i];
        }
    }

    // Call the preload function
    preload();

    // Image rollover
    $('li a').hover(
        function() {
            var originalImage = $(this).find('img').attr('src');
            var rolloverImage = originalImage.replace('.jpg', '_info.jpg');
            $(this).find('img').attr('src', rolloverImage);
        },
        function() {
            var originalImage = $(this).find('img').attr('src');
            var normalImage = originalImage.replace('_info.jpg', '.jpg');
            $(this).find('img').attr('src', normalImage);
        }
    );

    // Image click to update order list and total
    $('li a').click(function(e) {
        e.preventDefault();

        var itemName = $(this).find('img').attr('alt');
        var itemPrice = 0; 
        switch(itemName) {
            case "biscotti":
                itemPrice = 1.95;
                break;
            case "cappuccino":
                itemPrice = 3.45;
                break;
            case "coffee":
                itemPrice = 1.75;
                break;
            case "espresso":
                itemPrice = 1.95;
                break;
            case "latte":
                itemPrice = 2.95;
                break;
            case "scone":
                itemPrice = 2.95;
                break;
        }
        $('#order').append('<option value="' + itemName + '">' + itemName + ' - $' + itemPrice + '</option>');

        updateTotal();
    });

    // Place Order button click event
    $('#place_order').click(function() {
        window.location.href = 'checkout.html';
    });

    // Clear Order button click event
    $('#clear_order').click(function() {
        $('#order').empty();
        updateTotal();
    });

    // Function to update the order total
    function updateTotal() {
        var total = 0;
        $('#order option').each(function() {
            var itemPrice = parseFloat($(this).text().split('- $')[1]);
            total += itemPrice;
        });

        $('#total').text('Total: $' + total.toFixed(2));
    }
});
