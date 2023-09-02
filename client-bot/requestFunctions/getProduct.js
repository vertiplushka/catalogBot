const { bot } = require("../botinit");
const { apiUrl, productsUrl } = require("../endpoints");
const { request } = require("./request");

async function getProduct(chatId, id) {
    const response = await request('get', `${apiUrl}${productsUrl}${id}?populate=*`)

    const product = response.data.data

    const caption = `<b>${product.attributes.name}</b> \n\n${product.attributes.description}\n\n💰Цена - <b>${product.attributes.price}₽</b>`
    const photoId = product.attributes.picUrl
    const keyboard = {
        inline_keyboard: [
            [{text: 'Добавить товар в корзину 🛒', callback_data: `add:cart:${product.id}`}],
            [{text: 'Вернуться назад ↩️', callback_data: `get:undercategory:${product.attributes.undercategory.data.id}`}]
        ]
    }

    const options = {
        caption: caption,
        reply_markup: JSON.stringify(keyboard),
        parse_mode: 'HTML' 
    }

    bot.sendPhoto(chatId, photoId, options)
}

module.exports = {
    getProduct
}