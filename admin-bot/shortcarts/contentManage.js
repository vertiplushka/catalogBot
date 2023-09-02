const { bot } = require("../botinit");
const { apiUrl, undercategoriesUrl } = require("../endpoints");
const { request } = require("../requestFunctions/request");

async function contentManage(chatId) {
    const response = await request('get', `${apiUrl}${undercategoriesUrl}`)


    const options = {
        disable_notification: true,
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [{ text: '📂 Действия с категориями', callback_data: 'as:as:' }],
                [
                    { text: '🗑️ Удалить категорию', callback_data: 'delete:undercategory:' },
                    { text: '➕ Добавить категорию', callback_data: 'create:undercategory:' },
                ],
                [{ text: '✏️ Переименовать категорию', callback_data: 'rename:undercategory:' }],
                [{ text: '📦 Действия с товарами', callback_data: 'as:as:' }],
                [
                    { text: '🗑️ Удалить товар', callback_data: 'delete:product:' },
                    { text: '➕ Добавить новый продукт', callback_data: 'create:product' },

                ],
                [{ text: '✏️ Редактировать товар', callback_data: 'edit:product:' }],
                [{ text: '🔙 Вернуться в главное меню', callback_data: 'goToMenu:default:' }]
            ]
        }
    }

    bot.sendMessage(chatId, '🛒 Меню управления каталогом товаров', options)

}

module.exports = {
    contentManage
}