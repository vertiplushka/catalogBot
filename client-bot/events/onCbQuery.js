const { bot } = require("../botinit")
const { parseInput } = require("../helpers")
const { menuKeyboard } = require("../keyboard")
const { getProduct } = require("../requestFunctions/getProduct")
const { getUndercategory } = require("../requestFunctions/getUndercategory")
const { setStateValue } = require("../state")
const { createOrder } = require("./shortcarts/createOrder")
const { onStart } = require("./shortcarts/onStart")
const { showCart } = require("./shortcarts/showCart")

async function onCbQuery(query) {
    const chatId = query.message.chat.id
    const messageId = query.message.message_id
    const data = parseInput(query.data)
    const username = query.from.username
    console.log(data)

    switch (data.type) {
        case 'default':
            if (data.action === 'goToUndergategory') {
                await bot.deleteMessage(chatId, messageId)
                await onStart(chatId)
            }

            if (data.action === 'goToMainMenu') {
                await bot.deleteMessage(chatId, messageId)
                await bot.sendMessage(chatId, 'Приветствуем вас! 🌿🛒\n\nДобро пожаловать в наш здоровый каталог-бот! Здесь вы найдете разнообразие здоровой еды и напитков, которые помогут вам поддерживать баланс и энергию. Давайте начнем ваше вдохновляющее шоппинг-путешествие! 💼🍏🥤', menuKeyboard)
            }

            break

        case 'undercategory':
            if (data.action === 'get') {
                await bot.deleteMessage(chatId, messageId)
                await getUndercategory(chatId, data.id)
            }
            break

        case 'product':
            if (data.action === 'get') {
                await bot.deleteMessage(chatId, messageId)
                await getProduct(chatId, data.id)

            }
            break
        case 'cart':
            if (data.action === 'add') {
                setStateValue(username, 'chosedProductId', data.id)
                setStateValue(username, 'enteringAmount', true)
                await bot.deleteMessage(chatId, messageId)
                await bot.sendMessage(chatId, '🛍️ Вы выбрали товар для добавления в корзину. \n\nПожалуйста, укажите, сколько единиц товара вы хотели бы приобрести. 🛒')

            }
            if (data.action === 'goTo') {
                await bot.deleteMessage(chatId, messageId)
                await showCart(username)

            }
            break
        case 'order':
            if (data.action === 'create') {
                await bot.deleteMessage(chatId, messageId)
                await createOrder(username)
            }
            break
    }

    // Добавленная логика для обработки перемещения по страницам
    if (data.action === 'nextPage' || data.action === 'prevPage') {
        const [, categoryId, page] = query.data.split(':');
        await bot.deleteMessage(chatId, messageId);
        await getUndercategory(chatId, categoryId, parseInt(page));
    }
}

module.exports = {
    onCbQuery
}
