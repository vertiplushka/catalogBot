const { apiUrl, productsUrl } = require("../../endpoints");
const { request } = require("../request");

async function deleteProduct(id) {
    try {

        const response = await request('delete', `${apiUrl}${productsUrl}${id}`)

        const text = `Продукт <b>${response.data.data.attributes.name}</b> успешно удален`

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
            text: '🆘 Ошбика при удалении товара',
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
    deleteProduct
}