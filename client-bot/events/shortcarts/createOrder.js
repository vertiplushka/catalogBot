const { bot } = require("../../botinit");
const { apiUrl, ordersEndpoint } = require("../../endpoints");
const { request } = require("../../requestFunctions/request");
const { getStateValue, clearCart } = require("../../state");
const { generateOrderBody } = require("./generateOrderBody");

async function createOrder(username) {
    try {
        const chatId = getStateValue(username, 'chatId')
        const body = await generateOrderBody(getStateValue(username, 'cart'))
    
        const data = {
            data : {
                date: new Date().toISOString(),
                username: username,
                body: body.orderBody,
                totalCost: body.totalCost,
                chatId: chatId
            }
        }
        const response = await request('post', `${apiUrl}${ordersEndpoint}`, data)
        const totalCost = response.data.data.attributes.totalCost

        bot.sendMessage(chatId, `Ваш заказ на ${totalCost}₽ успешно оформлен! 🛍️ Мы сообщим вам, когда он будет готов к выдаче. Спасибо за покупку! 🌿🌟`, {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Вернуться в главное меню 🏠', callback_data: 'goToMainMenu:default:' }]
                ]
            }
        })
        clearCart(username)

    } catch (error) {
        console.log(error)        
    }
}

module.exports = {
    createOrder,
}