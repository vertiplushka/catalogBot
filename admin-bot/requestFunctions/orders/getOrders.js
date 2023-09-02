const { bot } = require("../../botinit");
const { apiUrl, ordersEndpoint } = require("../../endpoints");
const { formatDate } = require("../../helpers");
const { request } = require("../request");

async function getOrders(chatId) {
    const response = await request('get', `${apiUrl}${ordersEndpoint}?pagination[pageSize]=10000`);

    const inline = {
        reply_markup: {
            inline_keyboard: []
        }
    };

    const items = response.data.data;

    for (let i = 0; i < items.length; i++) {
        if (items[i].attributes.complited) {
            inline.reply_markup.inline_keyboard.push([{ text: `✅ ${formatDate(items[i].attributes.date)} ${items[i].attributes.totalCost}₽`, callback_data: `get:order:${items[i].id}` }]);
        } else {
            inline.reply_markup.inline_keyboard.push([{ text: `☑️ ${formatDate(items[i].attributes.date)} ${items[i].attributes.totalCost}₽`, callback_data: `get:order:${items[i].id}` }]);
        }
    }

    inline.reply_markup.inline_keyboard.push([{ text: '🔙 Вернуться в главное меню', callback_data: 'goToMenu:default:' }]);
    
    bot.sendMessage(chatId, 'Список заказов', inline);
}

module.exports = {
    getOrders
};
