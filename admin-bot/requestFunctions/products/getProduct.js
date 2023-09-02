const { bot } = require("../../botinit");
const { apiUrl, productsUrl } = require("../../endpoints");
const { request } = require("../request");

async function getProduct(chatId, id) {
    try {
        const response = await request('get', `${apiUrl}${productsUrl}${id}?populate=*`)

        const product = response.data.data

        const caption = `<b>${product.attributes.name}</b> \n\n${product.attributes.description}\n\n💰Цена - <b>${product.attributes.price}₽</b>`
        const photoId = product.attributes.picUrl
        const keyboard = {
            inline_keyboard: [
                [
                    { text: 'Редактировать фото 📷', callback_data: `editPhoto:product:${product.id}` },
                ],
                [
                    { text: 'Редактировать название ✏️', callback_data: `editName:product:${product.id}` },
                ],
                [
                    { text: 'Редактировать описание ✍️', callback_data: `editDescription:product:${product.id}` },
                ],
                [
                    { text: 'Редактировать стоимость 💰', callback_data: `editPrice:product:${product.id}` },
                ],
                [
                    { text: 'Вернуться назад ↩️', callback_data: `edit:product:` },
                ]

            ]
        }

        const options = {
            caption: caption,
            reply_markup: JSON.stringify(keyboard),
            parse_mode: 'HTML'
        }

        await bot.sendPhoto(chatId, photoId, options)
    } catch (error) {
        await bot.sendMessage(chatId, '🆘 Ошибка при получении карточки товара \n\nСкорее всего ссылка на фотографию товара нерабочая', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Редактировать фото 📷', callback_data: `editPhoto:product:${id}` },
                    ],
                    [
                        { text: 'Вернуться назад ↩️', callback_data: `edit:product:` },
                    ]
                ]
            }
        })
    }
}

module.exports = {
    getProduct
}