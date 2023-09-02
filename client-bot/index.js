const { bot } = require("./botinit")
const { onCbQuery } = require("./events/onCbQuery")
const { onMessage } = require("./events/onMessge");
const { startRepeat } = require("./fiveDays");
const { startNotify } = require("./interval");


const start = () => {
    startNotify()
    startRepeat()
    //bot.on('polling_error', (error) => console.log('polling error'))
    bot.on('message', async (msg) => {
      await onMessage(msg)
    })
    bot.on('callback_query', async (quere) => {
        await onCbQuery(quere)
    })
}

try {
   start()
} catch (error) {
    console.log(error)
}