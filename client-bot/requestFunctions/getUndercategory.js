const { bot } = require("../botinit");
const { apiUrl, undercategoriesUrl } = require("../endpoints");
const { request } = require("./request");

const productsPerPage = 7; // Количество продуктов на странице

async function getUndercategory(chatId, id, page = 1) {
    const response = await request('get', `${apiUrl}${undercategoriesUrl}${id}?populate=*`);

    const products = response.data.data.attributes.products.data;
    const totalPages = Math.ceil(products.length / productsPerPage);

    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    const productsOnPage = products.slice(startIndex, endIndex);

    const inline = {
        reply_markup: {
            inline_keyboard: []
        }
    };

    for (let i = 0; i < productsOnPage.length; i++) {
        inline.reply_markup.inline_keyboard[i] = [{
            text: `${productsOnPage[i].attributes.name} ${productsOnPage[i].attributes.price}₽`,
            callback_data: `get:product:${productsOnPage[i].id}`
        }];
    }

    if (page < totalPages && page > 1){
        inline.reply_markup.inline_keyboard.push([{ text: '⬅️ Предыдущая страница', callback_data: `prevPage:${id}:${page - 1}` }, { text: 'Следующая страница ➡️', callback_data: `nextPage:${id}:${page + 1}` }]);
    }
    else {
        if (page < totalPages) {
            inline.reply_markup.inline_keyboard.push([{ text: 'Следующая страница ➡️', callback_data: `nextPage:${id}:${page + 1}` }]);
        }
    
        if (page > 1) {
            inline.reply_markup.inline_keyboard.push([{ text: '⬅️ Предыдущая страница', callback_data: `prevPage:${id}:${page - 1}` }]);
        }
    
    }
    
    inline.reply_markup.inline_keyboard.push([{ text: 'Вернуться назад ↩️', callback_data: `goToUndergategory:default:` }]);

    bot.sendMessage(chatId, '🛒 Вот список доступных продуктов для вашего выбора:', inline);
}

module.exports = {
    getUndercategory,
};
