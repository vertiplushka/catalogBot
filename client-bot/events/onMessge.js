const { bot } = require("../botinit")
const { menuKeyboard } = require("../keyboard")
const { hasInside, createUserState, getStateValue, addToCart, setStateValue } = require("../state")
const { onStart } = require("./shortcarts/onStart")
const { showCart } = require("./shortcarts/showCart")

async function onMessage(msg) {
    const chatId = msg.chat.id
    const username = msg.from.username
    const messageText = msg.text
    if (msg.photo) {
        // Получаем информацию о фотографии с максимальным размером
        const photo = msg.photo[msg.photo.length - 1];
        
        // Отправляем id фотографии в чат
        bot.sendMessage(msg.chat.id, `${photo.file_id}`);
    }

    if (!hasInside(username)) {
        createUserState(username, chatId)
    }

    if (messageText === '/start') {
        bot.sendMessage(chatId, 'Приветствуем вас! 🌿🛒\n\nДобро пожаловать в наш здоровый каталог-бот! Здесь вы найдете разнообразие здоровой еды и напитков, которые помогут вам поддерживать баланс и энергию. Давайте начнем ваше вдохновляющее шоппинг-путешествие! 💼🍏🥤', menuKeyboard)
    }

    if (messageText === '📦 Каталог товаров') {
        onStart(chatId)
    }

    if (messageText === '🛒 Корзина') {
        showCart(username)
    }
    if (getStateValue(username, 'enteringAmount')) {
        const enteredAmount = parseInt(messageText);
    
        if (!isNaN(enteredAmount)) {
            addToCart(username, {id: getStateValue(username, 'chosedProductId'), amount: enteredAmount})
            setStateValue(username, 'chosedProductId', null)
            setStateValue(username, 'enteringAmount', false)
            bot.sendMessage(chatId, `✅ Отлично! Записал: ${enteredAmount} ед. товара. Большое спасибо! 🎉`, {
                reply_markup: {
                    inline_keyboard: [
                        [{text: "Продолжить покупки ➡️", callback_data: 'goToUndergategory:default:'}],
                        [{text: 'Перейти в корзину 🛒', callback_data: 'goTo:cart:'}]
                    ]
                }
            })
        } else {
            bot.sendMessage(chatId, 'Пожалуйста, отправьте число. 📝')
        }
    }
    
}

module.exports = {
    onMessage
}