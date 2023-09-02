const { apiUrl, productsUrl } = require("../../endpoints");
const { request } = require("../../requestFunctions/request");

async function generateOrderBody(cartItems) {
    
    let totalPrice = 0
    let orderBody = '';

    for (const item of cartItems) {
        const response = await request('get', `${apiUrl}${productsUrl}${item.id}`)
        const product = response.data.data.attributes; // Предполагается, что вы получите информацию о товаре из API

        const itemName = product.name;
        const itemPrice = product.price;
        const itemCount = item.amount; // Предполагается, что количество товаров хранится в свойстве amount

        const itemTotalPrice = itemPrice * itemCount;
        totalPrice += itemTotalPrice;

        orderBody += `${itemCount} x ${itemName} - ${itemTotalPrice}₽\n`;
    }
    
    const data = {
        orderBody: orderBody,
        totalCost: totalPrice
    }
    
    return data
}

module.exports = {
    generateOrderBody,
}