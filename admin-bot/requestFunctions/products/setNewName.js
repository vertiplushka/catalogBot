const { apiUrl, productsUrl } = require("../../endpoints");
const { getStateValue } = require("../../state");
const { request } = require("../request");

async function setNewName(username) {
    const data = {
        data: {
            name: getStateValue(username, 'product.edit.name')
        }
    }

    const response = await request('put', `${apiUrl}${productsUrl}${getStateValue(username, 'product.edit.id')}`, data)
}

module.exports = {
    setNewName
}