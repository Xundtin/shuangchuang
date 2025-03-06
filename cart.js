// cart.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 渲染购物车商品
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    // 清空容器
    cartItemsContainer.innerHTML = '';

    // 遍历购物车商品
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="images/${item.name}.png" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>单价: ￥${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button onclick="decreaseQuantity(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>
            <p class="price">￥${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeItem(${index})">删除</button>
        `;

        cartItemsContainer.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    // 更新总价
    totalPriceElement.textContent = `￥${totalPrice.toFixed(2)}`;
}

// 增加商品数量
function increaseQuantity(index) {
    cart[index].quantity += 1;
    saveCart();
    renderCartItems();
}

// 减少商品数量
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1); // 如果数量为 1，直接删除商品
    }
    saveCart();
    renderCartItems();
}

// 删除商品
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCartItems();
}

// 保存购物车到 localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// 更新购物车数量
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// 结算功能
function checkout() {
    alert('结算功能正在开发中，敬请期待！');
}

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
    updateCartCount();
});