const { apiUrl, productsUrl } = require("../../endpoints");
const { request } = require("../request");

async function getProductName(id) {
    const response = await request('get', `${apiUrl}${productsUrl}${id}`)
    return response.data.data.attributes.name
}

module.exports = {
    getProductName
}