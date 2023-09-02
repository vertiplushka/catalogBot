const { bot } = require("../botinit")

const keyboard = {
    reply_markup: {
        keyboard: [
            [
                {text: 'Управление контентом'}
            ],
            [
                {text: 'Заказы'}
            ]
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
    }
}

async function mainMenu (chatId) {
    console.log(chatId)
    await bot.sendMessage(chatId, 'Добро пожаловать в главное меню. Отсюда вы сможете принимать заказы и редактировать позиции в каталоге', keyboard)
}

module.exports = {
    mainMenu,
}