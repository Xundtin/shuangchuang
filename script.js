// script.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: itemName, price: price, quantity: 1 });
    }
    saveCart();
    alert(`${itemName} 已加入购物车！`);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// 初始化购物车数量
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});