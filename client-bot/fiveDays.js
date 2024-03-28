const { bot } = require("./botinit");
const { getStateValue, hasPassedFiveDays } = require("./state");

async function sendMessageToUser(username) {
    const chatId = getStateValue(username, 'chatId')
    const cart = getStateValue(username, 'cart')
    if (cart.length === 0) {
        await bot.sendMessage(chatId, 'Похоже, что ваша корзина пуста. Самое время добавить пару товаров в вашу корзину', {
            reply_markup: {
                inline_keyboard:[ [{text: 'Начать покупки', callback_data: 'goToUndergategory:default:'}]]
            }
        })
    } else {
        await bot.sendMessage(chatId, 'В вашей корзине уже лежат товары, но видимо вы забыли оформить заказ. Сейчас - самое время это сделать', {
            reply_markup: {
                inline_keyboard:[ [{text: 'Начать покупки', callback_data: 'goTo:cart:'}]]
            }
        })
    }
}

async function checkAndSendMessages() {
    // Перебираем всех пользователей из вашего state
    for (const username in state) {
      if (hasPassedFiveDays(username)) {
        // Если прошло пять дней с последнего действия, отправляем сообщение
        await sendMessageToUser(username);
      }
    }
  }
  
  function startRepeat() {
    setInterval(checkAndSendMessages, 24 * 60 * 60 * 1000); // 24 часа в миллисекундах
  }
  
  module.exports = {
    startRepeat
  }
  