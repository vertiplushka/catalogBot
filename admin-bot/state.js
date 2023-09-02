const state = {};

function createUserState(username, chatId) {
    state[username] = {
        username: username,
        chatId: chatId,
        'category.rename.id': null,
        'category.rename.name': null,

        'category.create.name': null,

        'category.delete.id': null,

        'product.edit.id': null,
        'product.edit.name': null,
        'product.edit.url': null,
        'product.edit.price': null,
        'product.edit.description': null,

        'product.create.name': null,
        'product.create.url': null,
        'product.create.price': null,
        'product.create.description': null,

        'product.delete.id': null,

        'boolflags.category.isCreate': false,
        'boolflags.category.isRename': false,
        'boolflags.category.isDelete': false,

        'boolflags.product.isCreate': false,
        'boolflags.product.isEdit': false,
        'boolflags.product.isDelete': false,

        'isEntering.name': false,
        'isEntering.url': false,
        'isEntering.price': false,
        'isEntering.description': false,
    };
};


function setStateValue(username, key, value) {
    if (state[username]) {
        state[username][key] = value;
    };
};

function getStateValue(username, key) {
    if (state[username] && state[username][key] !== undefined) {
        return state[username][key];
    } else {
        return null; // Вернуть null, если ключ или пользователь не найдены
    }
};

function hasInside(username) {
    if (state.hasOwnProperty(username)) {
        return true
    } else {
        return false
    }
}


module.exports = {
    createUserState,
    setStateValue,
    getStateValue,
    hasInside,
};



