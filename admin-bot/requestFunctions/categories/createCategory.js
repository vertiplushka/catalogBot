const { apiUrl, undercategoriesUrl } = require("../../endpoints");
const { getStateValue } = require("../../state");
const { request } = require("../request");

async function createCategory(username) {
    try {
        const data = {
            data: {
                name: getStateValue(username, 'category.create.name')
            }
        }

        const response = await request('post', `${apiUrl}${undercategoriesUrl}`, data)

        const text = `Новая категория <b>${response.data.data.attributes.name}</b> успешно создана`

        return {
            text: text,
            options: {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Вернуться назад', callback_data: 'goToPanel:default:' }]
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
                        [{ text: 'Вернуться назад', callback_data: 'goToPanel:default:' }]
                    ]
                }
            }
        }
    }
}

module.exports = {
    createCategory
}