const { apiUrl, productsUrl } = require("../../endpoints");
const { getStateValue } = require("../../state");
const { request } = require("../request");

async function setNewPrice(username) {
    const data = {
        data: {
            price: getStateValue(username, 'product.edit.price')
        }
    }

    const response = await request('put', `${apiUrl}${productsUrl}${getStateValue(username, 'product.edit.id')}`, data)
    console.log('успех')
}

module.exports = {
    setNewPrice
}