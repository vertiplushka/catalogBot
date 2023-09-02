const { bot } = require("./botinit")
const { onCbQuery } = require("./onEvent/onCbQuery")
const { onMessage } = require("./onEvent/onMessage")


const start = () => {
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