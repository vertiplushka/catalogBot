const { bot } = require("./botinit");
const { apiUrl, ordersEndpoint } = require("./endpoints");
const { formatDate } = require("./helpers");
const { request } = require("./requestFunctions/request");

let lastComplitedValues = {};

function sendNotification(item) {
    const body = item.body
    const cost = item.totalCost;
    const date = formatDate(item.date);
    const chatId = item.chatId
    bot.sendMessage(chatId, `Ваш заказ, оформленный ${date}:\n\n ${body}\nНа сумму ${cost}₽ готов к выдаче. Ждем вас с нетерпением! 🛍️🎉`);
    console.log('Sending notification to chat ID:', chatId);
    console.log('Updated complited status for item ID:', item.id);
}

async function fetchDataAndNotify() {
    try {
        const response = await request('get', `${apiUrl}${ordersEndpoint}?pagination[pageSize]=10000`);
        const data = response.data.data;

        for (const item of data) {
            const id = item.id;
            const complited = item.attributes.complited;

            if (lastComplitedValues[id] !== complited) {
                lastComplitedValues[id] = complited;
                if (complited === true) {
                    sendNotification(item.attributes);
                }
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

function startNotify() {
    setInterval(fetchDataAndNotify, 60000);
}


module.exports = {
    startNotify
}