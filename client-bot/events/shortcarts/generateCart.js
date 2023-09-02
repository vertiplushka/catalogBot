const { apiUrl, productsUrl } = require("../../endpoints");
const { request } = require("../../requestFunctions/request");

async function generateCart(cartItems) {
    let totalPrice = 0
    let cartInfo = 'Ваша корзина с здоровыми вкусностями: \n\n🛒 Товары в корзине:\n';

    for (const item of cartItems) {
        const response = await request('get', `${apiUrl}${productsUrl}${item.id}`)
        const product = response.data.data.attributes; // Предполагается, что вы получите информацию о товаре из API

        const itemName = product.name;
        const itemPrice = product.price;
        const itemCount = item.amount; // Предполагается, что количество товаров хранится в свойстве amount

        const itemTotalPrice = itemPrice * itemCount;
        totalPrice += itemTotalPrice;

        cartInfo += `${itemCount} x ${itemName} - ${itemTotalPrice}₽\n`;
    }
    cartInfo += `\n💰 Итого к оплате: ${totalPrice}₽`;
    return cartInfo
}

module.exports = {
    generateCart,
}