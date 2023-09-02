const { bot } = require("../../botinit")
const { apiUrl, ordersEndpoint } = require("../../endpoints")
const { request } = require("../request")

async function compliteOrder(chatId, id) {
    const data = {
        data: {
            complited: true
        }
    }
    const response = await request('put', `${apiUrl}${ordersEndpoint}${id}`, data)
    bot.sendMessage(chatId, 'Заказ успешно собран', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Вернуться назад', callback_data: 'goToOrders:default' }]
            ]
        }
    })

}

module.exports = {
    compliteOrder
}