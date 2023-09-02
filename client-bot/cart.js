// Инициализация пустой корзины
const Cart = [];

// Функция добавления товара в корзину пользователя (с возможностью добавления только id или только amount)
function addToCart(username, item) {
  if (!Cart[username]) {
    Cart[username] = [];
  }
  
  const existingItem = Cart[username].find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    if (item.id !== undefined) {
      existingItem.id = item.id;
    }
    if (item.amount !== undefined) {
      existingItem.amount = item.amount;
    }
  } else {
    Cart[username].push(item);
  }
}

// Функция получения списка товаров пользователя из корзины
function getCartItems(username) {
  return Cart[username] || [];
}

// Пример использования функций
addToCart('username1', { id: 31, amount: 2 });
addToCart('username1', { id: 1, amount: 5 });
addToCart('username2', { id: 12, amount: 5 });
addToCart('username2', { id: 6, amount: 2 });

console.log(getCartItems('username1'));
console.log(getCartItems('username2'));

// Добавление только id
addToCart('username1', { id: 32 });
console.log(getCartItems('username1'));

// Добавление только amount
addToCart('username1', { amount: 3 });
console.log(getCartItems('username1'));

console.log(Cart)

console.log('\n\n\n')
console.log(parseInt('6'))
console.log(parseInt('2fa'))