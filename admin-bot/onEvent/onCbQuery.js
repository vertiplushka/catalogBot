const { bot } = require("../botinit")
const { parseInput } = require("../helpers")
const { compliteOrder } = require("../requestFunctions/orders/compliteOrder")
const { createCategory } = require("../requestFunctions/categories/createCategory")
const { createProduct } = require("../requestFunctions/products/createProduct")
const { deleteCategory } = require("../requestFunctions/categories/deleteCategory")
const { deleteOrder } = require("../requestFunctions/orders/deleteOrder")
const { deleteProduct } = require("../requestFunctions/products/deleteProduct")
const { getCategoriesList } = require("../requestFunctions/categories/getCategoriesList")
const { getCategoryName } = require("../requestFunctions/categories/getCategoryName")
const { getOrder } = require("../requestFunctions/orders/getOrder")
const { getOrders } = require("../requestFunctions/orders/getOrders")
const { getProduct } = require("../requestFunctions/products/getProduct")
const { getProductName } = require("../requestFunctions/products/getProductName")
const { getProductsList } = require("../requestFunctions/products/getProductsList")
const { renameCategory } = require("../requestFunctions/categories/renameCategory")
const { contentManage } = require("../shortcarts/contentManage")
const { mainMenu } = require("../shortcarts/mainMenu")
const { setStateValue, getStateValue } = require("../state")

async function onCbQuery(quere) {
    const username = quere.from.username
    const chatId = quere.message.chat.id
    const messageId = quere.message.message_id
    const data = parseInput(quere.data)
    bot.answerCallbackQuery(quere.id)
    console.log(data)

    switch (data.type) {
        case 'default':
            if (data.action === 'goToMenu') {
                await bot.deleteMessage(chatId, messageId)
                await mainMenu(chatId)
            }
            if (data.action === 'goToPanel') {
                await bot.deleteMessage(chatId, messageId)
                await contentManage(chatId)
            }
            if (data.action === 'goToOrders') {
                await bot.deleteMessage(chatId, messageId)
                await getOrders(chatId)
            }
            break
        case 'undercategory':
            if (data.action === 'rename') {
                if (data.id === null) {
                    await bot.deleteMessage(chatId, messageId)
                    await bot.sendMessage(chatId, 'Список всех категорий \n<b>Выберите категорию для изменения ее названия</b>', await getCategoriesList('rename'))
                } else {
                    await bot.deleteMessage(chatId, messageId)
                    await bot.sendMessage(chatId, `Введите <b>новое название</b> для категории <b>${await getCategoryName(data.id)}</b> сообщением ниже`, { parse_mode: 'HTML' })
                    setStateValue(username, 'boolflags.category.isRename', true)
                    setStateValue(username, 'category.rename.id', data.id)
                    console.log(getStateValue(username, 'boolflags.category.isRename'), getStateValue(username, 'category.rename.id'))
                }
            }
            else if (data.action === 'confimRename') {
                await bot.deleteMessage(chatId, messageId)
                await bot.sendMessage(chatId, '⌛️ ЗАГРУЗКА...')
                const renamedCateg = await renameCategory(username)
                await bot.deleteMessage(chatId, messageId + 1)
                await bot.sendMessage(chatId, renamedCateg.text, renamedCateg.options)
            }
            else if (data.action === 'create') {
                await bot.deleteMessage(chatId, messageId)
                setStateValue(username, 'boolflags.category.isCreate', true)
                await bot.sendMessage(chatId, 'Введите  название для <b>новой категории</b> сообщением ниже', { parse_mode: 'HTML' })

            }
            else if (data.action === 'confimCreate') {
                await bot.deleteMessage(chatId, messageId)
                await bot.sendMessage(chatId, '⌛️ ЗАГРУЗКА...')
                const newCateg = await createCategory(username)
                await bot.deleteMessage(chatId, messageId + 1)
                await bot.sendMessage(chatId, newCateg.text, newCateg.options)
            }
            else if (data.action === 'delete') {
                if (data.id === null) {
                    await bot.deleteMessage(chatId, messageId)
                    await bot.sendMessage(chatId, 'Список всех категорий \n<b>Выберите категорию для ее удаления</b>', await getCategoriesList('delete'))
                } else {
                    bot.deleteMessage(chatId, messageId)
                    bot.sendMessage(chatId, `Вы действительно хотите удалить <b>${await getCategoryName(data.id)}</b>?`, {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: 'Отменить ❌', callback_data: 'delete:undercategory' },
                                    { text: 'Подтвердить ✅', callback_data: `confimDelete:undercategory:${data.id}` }
                                ]
                            ]
                        }
                    })
                }
            }
            else if (data.action === 'confimDelete') {
                await bot.deleteMessage(chatId, messageId)
                await bot.sendMessage(chatId, '⌛️ ЗАГРУЗКА...')
                const delCateg = await deleteCategory(data.id)
                await bot.deleteMessage(chatId, messageId + 1)
                await bot.sendMessage(chatId, delCateg.text, delCateg.options)
            }
            else if (data.action === 'choose') {
                await bot.deleteMessage(chatId, messageId)
                await bot.sendMessage(chatId, 'Выберите, к какой категории будет отновиться ваш новый товар', await getCategoriesList('createProduct'))
            }
            else if (data.action === 'createProduct') {
                await bot.deleteMessage(chatId, messageId)
                createProduct(username, data.id)
            }
            break
        case 'product': {
            if (data.action === 'create') {
                await bot.deleteMessage(chatId, messageId)
                await bot.sendMessage(chatId, 'Введите название для вашего нового продукта')
                setStateValue(username, 'isEntering.name', true)
                setStateValue(username, 'boolflags.product.isCreate', true)
            }
            else if (data.action === 'delete') {
                if (data.id === null) {
                    await bot.deleteMessage(chatId, messageId)
                    await bot.sendMessage(chatId, 'Выберите товар, который вы хотите удалить', await getProductsList('delete'))
                } else {
                    await bot.deleteMessage(chatId, messageId)
                    await bot.sendMessage(chatId, `Вы действительно хотите удалить <b>${await getProductName(data.id)}</b>?`, {
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: 'Отменить ❌', callback_data: 'delete:product:' },
                                    { text: 'Подтвердить ✅', callback_data: `confimDelete:product:${data.id}` }
                                ]
                            ]
                        }
                    })
                }
            }
            else if (data.action === 'confimDelete') {
                await bot.deleteMessage(chatId, messageId)
                await bot.sendMessage(chatId, '⌛️ ЗАГРУЗКА...')
                const delProd = await deleteProduct(data.id)
                await bot.deleteMessage(chatId, messageId + 1)
                await bot.sendMessage(chatId, delProd.text, delProd.options)
            }
            else if (data.action === 'edit') {
                if (data.id === null) {
                    await bot.deleteMessage(chatId, messageId)
                    await bot.sendMessage(chatId, 'Выберите товар из списка для редактирования', await getProductsList('edit'))
                }
                else {
                    await bot.deleteMessage(chatId, messageId)
                    await getProduct(chatId, data.id)
                }
            }
            else if (data.action === 'editPhoto') {
                await bot.deleteMessage(chatId, messageId)
                await bot.sendMessage(chatId, 'Отправьте ссылку на новую фотографию товара')
                setStateValue(username, 'boolflags.product.isEdit', true)
                setStateValue(username, 'product.edit.id', data.id)
                setStateValue(username, 'isEntering.url', true)
            }
            else if (data.action === 'editName') {
                await bot.deleteMessage(chatId, messageId)
                await bot.sendMessage(chatId, 'Отправьте новое название товара')
                setStateValue(username, 'boolflags.product.isEdit', true)
                setStateValue(username, 'product.edit.id', data.id)
                setStateValue(username, 'isEntering.name', true)
            }
            else if (data.action === 'editPrice') {
                await bot.deleteMessage(chatId, messageId)
                await bot.sendMessage(chatId, 'Отправьте новую стоимость товара')
                setStateValue(username, 'boolflags.product.isEdit', true)
                setStateValue(username, 'product.edit.id', data.id)
                setStateValue(username, 'isEntering.price', true)
            }
            else if (data.action === 'editDescription') {
                await bot.deleteMessage(chatId, messageId)
                await bot.sendMessage(chatId, 'Отправьте новое описание товара')
                setStateValue(username, 'boolflags.product.isEdit', true)
                setStateValue(username, 'product.edit.id', data.id)
                setStateValue(username, 'isEntering.description', true)
            }
        
            break
        }
        case 'order': {
            if (data.action === 'get') {
                await bot.deleteMessage(chatId, messageId)
                await getOrder(chatId, data.id)
            }
            else if (data.action === 'delete') {
                await bot.deleteMessage(chatId, messageId)
                await deleteOrder(chatId, data.id)
            }
            else if (data.action === 'complite') {
                await bot.deleteMessage(chatId, messageId)
                await compliteOrder(chatId, data.id)
            }
        }
    }
}

module.exports = {
    onCbQuery,
}