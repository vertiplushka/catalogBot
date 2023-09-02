const { bot } = require("../../botinit");
const { apiUrl, ordersEndpoint } = require("../../endpoints");
const { request } = require("../request");

async function deleteOrder (chatId, id)  {
    const response = await request('delete', `${apiUrl}${ordersEndpoint}${id}`)

    bot.sendMessage(chatId, 'Заказ успешно выдан', {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Вернуться назад', callback_data: 'goToOrders:default'}]
            ]
        }
    })
}

module.exports = {
    deleteOrder
}