// Quantity control functionality
document.querySelector('.quantity-btn.plus').addEventListener('click', function() {
    const input = document.querySelector('.quantity-input');
    input.value = parseInt(input.value) + 1;
});

document.querySelector('.quantity-btn.minus').addEventListener('click', function() {
    const input = document.querySelector('.quantity-input');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
});

// Add to cart functionality
document.querySelector('.add-to-cart').addEventListener('click', function() {
    alert('Added to cart!');
});

// Buy now functionality
document.querySelector('.buy-now').addEventListener('click', function() {
    alert('Proceeding to checkout!');
});