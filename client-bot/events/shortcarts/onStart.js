const { bot } = require("../../botinit")
const { mainMenu } = require("./mainMenu")

async function onStart(chatId) {
    bot.sendMessage(chatId, `Просто выберите категорию, чтобы начать исследование ассортимента. \nВ любой момент вы можете вернуться в главное меню. 🏠`, await mainMenu())
}

module.exports = {
    onStart
}