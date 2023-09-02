const { bot } = require("../../botinit");
const { apiUrl, ordersEndpoint } = require("../../endpoints");
const { formatDate } = require("../../helpers");
const { request } = require("../request");

async function getOrder(chatId, id) {
    const response = await request('get', `${apiUrl}${ordersEndpoint}${id}`)
    const item = response.data.data.attributes

    if (item.complited) {
        bot.sendMessage(chatId, `✅ Заказ @${item.username} от ${formatDate(item.date)} \n${item.body} \n Общая стоимость заказа - ${item.totalCost}₽`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Заказ выдан', callback_data: `delete:order:${id}` }]
                ]
            }
        })
    }
    else {
        bot.sendMessage(chatId, `☑️ Заказ @${item.username} от ${formatDate(item.date)} \n${item.body} \n Общая стоимость заказа - ${item.totalCost}₽`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Собрать заказ', callback_data: `complite:order:${id}` }]
                ]
            }
        })
    }

}

module.exports = {
    getOrder,
}