const menuKeyboard = {
    reply_markup: {
        keyboard: [
            [
                {text: '📦 Каталог товаров'},
                {text: '🛒 Корзина'}
            ]
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
    }
}

module.exports = {
    menuKeyboard,
}
