const { apiUrl, productsUrl } = require("../../endpoints");
const { request } = require("../request");

async function getProductsList(action) {
    const response = await request('get', `${apiUrl}${productsUrl}?pagination[pageSize]=100`) 
    let item 
    let itemId 

    const options = {
        disable_notification: true,
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: []
        }
    }
    console.log(response.data.data.length)
    for (let i = 0; i < response.data.data.length; i++) {
        item = response.data.data[i].attributes.name
        itemId = response.data.data[i].id 

        options.reply_markup.inline_keyboard[i] = [{text: `${item}`, callback_data: `${action}:product:${itemId}`}]
    }
    options.reply_markup.inline_keyboard[options.reply_markup.inline_keyboard.length] = [{text: 'Вернуться назад', callback_data: 'goToPanel:default:'}]

    return options
}

module.exports = {
    getProductsList
}