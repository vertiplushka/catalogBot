const { apiUrl, productsUrl } = require("../../endpoints");
const { getStateValue } = require("../../state");
const { request } = require("../request");

async function setNewDescription(username) {
    const data = {
        data: {
            description: getStateValue(username, 'product.edit.description')
        }
    }

    const response = await request('put', `${apiUrl}${productsUrl}${getStateValue(username, 'product.edit.id')}`, data)
}

module.exports = {
    setNewDescription
}