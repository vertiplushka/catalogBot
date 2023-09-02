const { apiUrl, undercategoriesUrl } = require("../../endpoints");
const { request } = require("../request");

async function getCategoryName(id) {
    const response = await request('get', `${apiUrl}${undercategoriesUrl}${id}`)
    return response.data.data.attributes.name
}

module.exports = {
    getCategoryName,
}