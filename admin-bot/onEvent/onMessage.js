const { bot } = require("../botinit")
const { getOrders } = require("../requestFunctions/orders/getOrders")
const { setNewDescription } = require("../requestFunctions/products/setNewDescription")
const { setNewName } = require("../requestFunctions/products/setNewName")
const { setNewPhoto } = require("../requestFunctions/products/setNewPhoto")
const { setNewPrice } = require("../requestFunctions/products/setNewPrice")
const { contentManage } = require("../shortcarts/contentManage")
const { mainMenu } = require("../shortcarts/mainMenu")
const { hasInside, createUserState, getStateValue, setStateValue } = require("../state")

async function onMessage(msg) {
    const chatId = msg.chat.id
    const messageText = msg.text
    const username = msg.from.username
    if (!hasInside(username)) {
        await createUserState(username, chatId)
    }

    if (messageText === '/start') {
        await mainMenu(chatId)
    }

    else if (messageText === 'Управление контентом') {
        await contentManage(chatId)
    }
    else if (messageText === 'Заказы') {
        await getOrders(chatId)
    }
    else if (getStateValue(username, 'boolflags.category.isRename')) {
        setStateValue(username, 'category.rename.name', messageText)
        setStateValue(username, 'boolflags.category.isRename', false)
        bot.sendMessage(chatId, `Новое название - <b>${messageText}</b>?`, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Отменить ❌', callback_data: 'rename:undercategory' },
                        { text: 'Подтвердить ✅', callback_data: `confimRename:undercategory:${getStateValue(username, 'category.rename.id')}` }
                    ]
                ]
            }
        })
    }
    else if (getStateValue(username, 'boolflags.category.isCreate')) {
        setStateValue(username, 'category.create.name', messageText)
        setStateValue(username, 'boolflags.category.isCreate', false)
        bot.sendMessage(chatId, `Название новой категории - <b>${messageText}</b>?`, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Отменить ❌', callback_data: 'goToPanel:default' },
                        { text: 'Подтвердить ✅', callback_data: `confimCreate:undercategory:` }
                    ]
                ]
            }
        })
    }
    else if (getStateValue(username, 'boolflags.product.isCreate')) {

        if (getStateValue(username, 'isEntering.price')) {
            if (!isNaN(parseFloat(messageText))) {
                setStateValue(username, 'boolflags.product.isCreate', false)
                setStateValue(username, 'product.create.price', parseFloat(messageText))
                setStateValue(username, 'isEntering.price', false)

                try {
                    await bot.sendPhoto(chatId, getStateValue(username, 'product.create.url'), {
                        caption: `<b>${getStateValue(username, 'product.create.name')}</b> \n\n${getStateValue(username, 'product.create.description')}\n\n💰Цена - <b>${getStateValue(username, 'product.create.price')}₽</b>`,
                        parse_mode: 'HTML'
                    })
                    await bot.sendMessage(chatId, 'Вот как будет выглядеть карточка товара для ваших клиентов 👆', {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: '🔄 Заполнить все заново', callback_data: 'create:product:' }, { text: '💾 Сохранить', callback_data: 'choose:undercategory:' }]
                            ]
                        }
                    });
                } catch (error) {
                    await bot.sendMessage(chatId, '🆘 Ссылка на фотографию товара недействительная. Заполните карточку товара еще раз', {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: '🔄 Заполнить товар заново', callback_data: 'create:product' }],
                                [{ text: 'Вернуться в главное меню 🏠', callback_data: 'goToPanel:default' }]
                            ]
                        }
                    })
                }

            } else {
                bot.sendMessage(chatId, 'Произошла ошибка при обработке цены товара. 🛠️ Отправьте цену еще раз.')
            }

        }
        if (getStateValue(username, 'isEntering.description')) {
            setStateValue(username, 'product.create.description', messageText);
            setStateValue(username, 'isEntering.description', false);
            setStateValue(username, 'isEntering.price', true);

            // Отправляем подтверждение о принятии описания товара
            await bot.sendMessage(chatId, `Описание товара успешно принято 👌`);
            await bot.sendMessage(chatId, 'Отправьте цену товара (если цена содержит копейки, то разделите их от рублей точкой)');
        }
        if (getStateValue(username, 'isEntering.url')) {
            if (msg.entities && msg.entities.length > 0 && msg.entities[0].type === 'url') {
                setStateValue(username, 'product.create.url', messageText);
                setStateValue(username, 'isEntering.url', false);
                setStateValue(username, 'isEntering.description', true);

                // Отправляем подтверждение о принятии фотографии товара
                await bot.sendMessage(chatId, `Фотография товара успешно принята 📷`);
                await bot.sendMessage(chatId, 'Отправьте описание товара');
            }
            else {
                // Отправляем сообщение с просьбой отправить фотографию товара
                await bot.sendMessage(chatId, 'Отправьте ссылку на фотографию товара 📷');
            }
        }

        if (getStateValue(username, 'isEntering.name')) {
            setStateValue(username, 'product.create.name', messageText);
            setStateValue(username, 'isEntering.name', false);
            setStateValue(username, 'isEntering.url', true);

            // Отправляем подтверждение о принятии названия товара
            await bot.sendMessage(chatId, `Название "${messageText}" успешно принято 👍`);
            await bot.sendMessage(chatId, 'Отправьте ссылку на фотографию товара 📷');
        }

    }
    else if (getStateValue(username, 'boolflags.product.isEdit')) {
        if (getStateValue(username, 'isEntering.price')) {
            if (!isNaN(parseFloat(messageText))) {
                setStateValue(username, 'product.edit.price', messageText);
                setStateValue(username, 'isEntering.price', false);
                setStateValue(username, 'boolflags.product.isEdit', false);

                await setNewPrice(username)
                // Отправляем подтверждение о принятии названия товара
                await bot.sendMessage(chatId, `Цена ${messageText}₽ успешно установлена  👍`, {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: 'Продолжить', callback_data: `edit:product:${getStateValue(username, 'product.edit.id')}` }
                            ]
                        ]
                    }
                });
            } else {
                bot.sendMessage(chatId, 'Произошла ошибка при обработке цены товара. 🛠️ Отправьте цену еще раз.')
            }

        }
        if (getStateValue(username, 'isEntering.description')) {
            setStateValue(username, 'product.edit.description', messageText);
            setStateValue(username, 'isEntering.description', false);
            setStateValue(username, 'boolflags.product.isEdit', false);

            await setNewDescription(username)
            // Отправляем подтверждение о принятии названия товара
            await bot.sendMessage(chatId, `Описание успешно принято 👍`, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Продолжить', callback_data: `edit:product:${getStateValue(username, 'product.edit.id')}` }
                        ]
                    ]
                }
            });
        }
        if (getStateValue(username, 'isEntering.url')) {
            if (msg.entities && msg.entities.length > 0 && msg.entities[0].type === 'url') {
                setStateValue(username, 'product.edit.url', messageText);
                setStateValue(username, 'isEntering.url', false);
                setStateValue(username, 'boolflags.product.isEdit', false);
                await setNewPhoto(username)
                // Отправляем подтверждение о принятии фотографии товара
                await bot.sendMessage(chatId, `Фотография товара успешно принята 📷`, {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: 'Продолжить', callback_data: `edit:product:${getStateValue(username, 'product.edit.id')}` }
                            ]
                        ]
                    }
                });

            }
            else {
                // Отправляем сообщение с просьбой отправить фотографию товара
                await bot.sendMessage(chatId, 'Отправьте ссылку на фотографию товара 📷');
            }
        }
        if (getStateValue(username, 'isEntering.name')) {
            setStateValue(username, 'product.edit.name', messageText);
            setStateValue(username, 'isEntering.name', false);
            setStateValue(username, 'boolflags.product.isEdit', false);

            await setNewName(username)
            // Отправляем подтверждение о принятии названия товара
            await bot.sendMessage(chatId, `Название "${messageText}" успешно принято 👍`, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Продолжить', callback_data: `edit:product:${getStateValue(username, 'product.edit.id')}` }
                        ]
                    ]
                }
            });

        }

    }
}

module.exports = {
    onMessage,
}