const { apiUrl, undercategoriesUrl } = require("../../endpoints");
const { getStateValue } = require("../../state");
const { request } = require("../request");

async function renameCategory(username) {
    try {
        const id = getStateValue(username, 'category.rename.id')
        const newName = getStateValue(username, 'category.rename.name')

        const data = {
            data: {
                name: newName
            }
        }
        const response = await request('put', `${apiUrl}${undercategoriesUrl}${id}`, data)

        const text = `Название категории успешно изменено на <b>${response.data.data.attributes.name}</b>`

        return {
            text: text,
            options: {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Вернуться назад', callback_data: 'rename:undercategory:' }]
                    ]
                }
            }
        }
    } catch (error) {
        return {
            text: '🆘 Произошла ошибка при создании категории',
            options: {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Вернуться назад', callback_data: 'rename:undercategory:' }]
                    ]
                }
            }
        }
    }
}

module.exports = {
    renameCategory
}