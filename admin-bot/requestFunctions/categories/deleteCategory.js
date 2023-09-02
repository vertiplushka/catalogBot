const { apiUrl, undercategoriesUrl } = require("../../endpoints");
const { request } = require("../request");

async function deleteCategory(id) {
    try {
    const response = await request('delete', `${apiUrl}${undercategoriesUrl}${id}`)

    const text = `Категория <b>${response.data.data.attributes.name}</b> успешно удалена`

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
            text: '🆘 Произошла ошибка при удалении категории',
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
    deleteCategory
}