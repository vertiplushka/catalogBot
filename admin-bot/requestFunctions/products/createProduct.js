const { bot } = require("../../botinit");
const { apiUrl, productsUrl } = require("../../endpoints");
const { getStateValue } = require("../../state");
const { request } = require("../request");

async function createProduct(username, id) {
    try {
        const chatId = getStateValue(username, 'chatId')
    const data = {
        data: {
            name: getStateValue(username, 'product.create.name'), 
            picUrl: getStateValue(username, 'product.create.url'),
            price: getStateValue(username, 'product.create.price'),
            description: getStateValue(username,  'product.create.description'),
            undercategory: id
        }
    }
    const response = await request('post', `${apiUrl}${productsUrl}`, data)

    const item = response.data.data.attributes
    bot.sendMessage(chatId, `Продукт ${item.name} успешно создан`, {
        reply_markup: {
            inline_keyboard: [
                [{text: 'В главное меню', callback_data: 'goToPanel:default'}]
            ]
        }
    })
    } catch (error) {
        bot.sendMessage(chatId, `🆘 Ошибка при создании продукта`, {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'В главное меню', callback_data: 'goToPanel:default'}]
                ]
            }
        })
    }
}

module.exports = {
    createProduct
}