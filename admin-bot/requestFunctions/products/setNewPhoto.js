const { apiUrl, productsUrl } = require("../../endpoints");
const { getStateValue } = require("../../state");
const { request } = require("../request");

async function setNewPhoto(username) {
    const data = {
        data: {
            picUrl: getStateValue(username, 'product.edit.url')
        }
    }

    const response = await request('put', `${apiUrl}${productsUrl}${getStateValue(username, 'product.edit.id')}`, data)
}

module.exports = {
    setNewPhoto
}