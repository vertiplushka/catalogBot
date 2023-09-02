const { DateTime } = require("luxon");

const state = {};

function createUserState(username, chatId) {
  state[username] = {
    username: username,
    chatId: chatId,
    chosedProductId: null,
    enteringAmount: false,
    date: new Date(),
    cart: []
  };
};

function setStateValue(username, key, value) {
  if (state[username]) {
    state[username].date = new Date();
    state[username][key] = value;
  };
};

function getStateValue(username, key) {
  state[username].date = new Date();
  if (state[username] && state[username][key] !== undefined) {
    return state[username][key];
  } else {
    return null; // Вернуть null, если ключ или пользователь не найдены
  }
};

function addToCart(username, item) {
  state[username].date = new Date();
  if (!state[username].cart) {
    state[username].cart = [];
  }
  const cart = state[username].cart;

  const existingItem = cart.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    if (item.id !== undefined) {
      existingItem.id = item.id;
    }
    if (item.amount !== undefined) {
      existingItem.amount = item.amount;
    }
  } else {
    cart.push(item);
  }
}

function clearCart(username) {
  state[username].date = new Date();
  if (state[username]) {
    state[username].cart = [];
  }
}

function hasInside(username) {
  if (state.hasOwnProperty(username)) {
    return true
  } else {
    return false
  }
}

function hasPassedFiveDays(username) {
  if (state[username] && state[username].date) {
    const lastActivityDate = DateTime.fromJSDate(state[username].date);
    const currentDate = DateTime.now();
    const difference = currentDate.diff(lastActivityDate, "days").toObject();
    return difference.days >= 5;
  }
  return false;
}


module.exports = {
  createUserState,
  setStateValue,
  getStateValue,
  hasInside,
  addToCart,
  clearCart,
  hasPassedFiveDays,
};