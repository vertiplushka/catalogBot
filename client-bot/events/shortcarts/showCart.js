const { bot } = require("../../botinit")
const { getStateValue } = require("../../state")
const { generateCart } = require("./generateCart")

async function showCart(username) {
    const chatId = getStateValue(username, 'chatId')

    const cart = getStateValue(username, 'cart')
    if (cart.length === 0) {
        bot.sendMessage(chatId, '🛒 Ваша корзина пока пуста. Пора начать добавлять здоровые и вкусные товары для вашего заказа! Выберите что-то из нашего ассортимента и добавьте в корзину.', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🛍️ Начать покупки', callback_data: 'goToUndergategory:default:' }]
                ]
            }
        })
    }
    else {
        await bot.sendMessage(chatId, await generateCart(getStateValue(username, 'cart')), {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Оформить заказ', callback_data: 'create:order:' }],
                    [{ text: 'Вернуться в главное меню 🏠', callback_data: 'goToMainMenu:default' }]
                ]
            }
        })
    }
}

module.exports = {
    showCart,
}