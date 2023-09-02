const { apiUrl, undercategoriesUrl } = require("../../endpoints");
const { request } = require("../../requestFunctions/request");

async function mainMenu() {
    const response = await request('get', `${apiUrl}${undercategoriesUrl}`);

    const inline = {
        reply_markup: {
            inline_keyboard: []
        }
    };

    const len = response.data.data.length;
    let currentIndex = 0;
    let currentRow = [];

    for (let i = 0; i < len; i++) {
        const categoryName = response.data.data[i].attributes.name;

        if (categoryName.length <= 13 && currentRow.length === 0) {
            currentRow.push({ text: categoryName, callback_data: `get:undercategory:${response.data.data[i].id}` });
        } else {
            if (currentRow.length > 0) {
                inline.reply_markup.inline_keyboard[currentIndex] = [...currentRow];
                currentRow = [];
                currentIndex++;
            }
            
            inline.reply_markup.inline_keyboard[currentIndex] = [
                { text: categoryName, callback_data: `get:undercategory:${response.data.data[i].id}` }
            ];
            currentIndex++;
        }
    }

    if (currentRow.length > 0) {
        inline.reply_markup.inline_keyboard[currentIndex] = [...currentRow];
    }

    inline.reply_markup.inline_keyboard.push([{ text: 'Вернуться в главное меню 🏠', callback_data: 'goToMainMenu:default:' }]);

    return inline;
}

module.exports = {
    mainMenu
};
