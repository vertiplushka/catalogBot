const telegramBot = require('node-telegram-bot-api')
const {token, programs, programsList } = require('./addons')
const bot = new telegramBot(token, {polling: true})

const myId = 732162115
const AuthorId = 451878659

let startCounter = 0
let bufSC = 0

function formatDate(d) {
    var date = new Date(d)
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('.');
  }

function formatTime(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let seconds = date.getSeconds();
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
  
    return `${hours}:${minutes}:${seconds}`;
}

const backToPrList = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Приобрести', url: 'https://t.me/VALERY182'}],
            [{text: 'Вернуться назад', callback_data: 'programs'}]
        ]
    })
}

const start = async () => {

    bot.on("polling_error", console.log);

    bot.on("callback_query", quere => {
        const chatId = quere.message.chat.id
        const messageId = quere.message.message_id
        const data = quere.data
        const user = quere.from.first_name

        switch(data) {

           
            case 'programs':
                bot.deleteMessage(chatId, messageId)
                bot.sendMessage(chatId, 'Выберите название интересующей вас программы, чтобы узнать о ней подробнее', programsList)
            break

            case 'pr1':
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun9-73.userapi.com/impg/5sYZ9fd_iyxCAP9qLV5G-BvACtKj12BnlHAPJg/tacYaBbQj0o.jpg?size=905x1280&quality=96&sign=75a41abc344dbe54d9213ac5a71792b6&type=album',backToPrList)
            break

            case 'pr2':
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun9-46.userapi.com/impg/DDbse77_hhIHepEfbQ2QDGA6AWM3IiO6PsnYeg/H3uYRNCUI2I.jpg?size=897x1280&quality=96&sign=4e3de85ff0d31a949d8366c1644ba3e4&type=album',backToPrList)
            break

            case 'pr3':
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun9-73.userapi.com/impg/Ym6R6Vw4T11bZXVk5CCfdMj9vBj8WaVapWgAOA/3AVbQDxCFa8.jpg?size=897x1280&quality=95&sign=d351ab3a8a68c1f85c43162c5f5b873f&type=album',backToPrList)
            break

            case 'pr4':
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun9-14.userapi.com/impg/uB1eyelTy9fTeERklpnaKqkq7QJ6VQ5YSCvcFw/nPv7ogfTbLg.jpg?size=896x1280&quality=96&sign=18f1be96967c180ce929ecd5e11840aa&type=album',backToPrList)
            break

            case 'pr5':
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun9-55.userapi.com/impg/TR_wpPEO-fq8S8ErMY0zTT8tHC7l52YYPcp6Lw/_Z2S4gm2GiM.jpg?size=905x1280&quality=96&sign=eadaed41f26781b6639edb545e626d2a&type=album',backToPrList)
            break

            case 'pr6':
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun4-17.userapi.com/impg/aWC9TWetqbL-M4fObVZ-MujxtX1ubqzTsQRLBA/pYY35FbVQUM.jpg?size=897x1280&quality=96&sign=3488feecd899adc9ab18667d5f1473af&type=album',backToPrList)
            break

            case 'pr7':
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun9-55.userapi.com/impg/n2MPd3gsNVNP3Tv_a8KO6XNgY3IUGiMDFGYz3A/u4XieEjdoaY.jpg?size=897x1280&quality=95&sign=407cdfc96f5adcb1489c9c2b5222f5e7&type=album',backToPrList)
            break

            case 'pr8':
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun9-55.userapi.com/impg/0nADY-9zqjuusEhDeVz35XILqZYeiMB2D1ZThg/LmxKTSlKRCo.jpg?size=905x1280&quality=95&sign=b5ecaae7c507a28d85479673cb339327&type=album',backToPrList)
            break

            case 'pr9':
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun9-74.userapi.com/impg/4YPSKIMxz1VMrZ9NNK5vANku6LwKFLZHU3DJ6g/JZ7PW0C-KKo.jpg?size=897x1280&quality=95&sign=f3d8d082528e8c8d7a6e45793f0b665d&type=album',backToPrList)
            break

            case 'pr10':
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun9-75.userapi.com/impg/r2qGgAPDo5rUpaoFb_03BeyJ_y1Pn0p9mP17dg/TpzcZBbyt-M.jpg?size=896x1280&quality=95&sign=08f17c0043eaa58564ee0d165a2cd81a&type=album',backToPrList)
            break

            case 'pr11':
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun9-66.userapi.com/impg/ROKeeBd2_luwbXm3zB9JZAQ1zZ6qqEOuOQ6lTg/Rcc1LoZoRGA.jpg?size=897x1280&quality=95&sign=9f68bb1f70ba99a7edc72031acbc343f&type=album',backToPrList)
            break

            case 'pr12':
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun9-40.userapi.com/impg/5_zloFlMDW4xQ-JFNfyfEbLbRiywOqOO77PPaw/r4QAMZLf3yE.jpg?size=890x1065&quality=95&sign=16043f432b9585246afa1a7cbfe49651&type=album',backToPrList)
            break

            case 'pr13':
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun9-50.userapi.com/impg/YlzUaJ2f_MIdGI7Sg_IEGgKgnju_XlBxCc_6FA/Vnm2mT7cytw.jpg?size=1051x1500&quality=96&sign=947591df1082acf0be65c7ff8c956c25&type=album',backToPrList)
            break

            case 'pr14':
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun4-17.userapi.com/impg/oKbxJ4wPpksX5GpH_JCsR5W4KEu2FkAFLPWi-Q/8nma3aeYuUE.jpg?size=896x1280&quality=96&sign=6e091168bd457993ed2174efe41f52b6&type=album',backToPrList)
            break

            case 'pr15':
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun9-55.userapi.com/impg/1Zdlrv32dJdhUmsNNDSlDp7VXfryTAGUg3T5Eg/n2Xgc-Empzg.jpg?size=897x1280&quality=96&sign=403714c73b0f859828d7d7b7388b7b4f&type=album',backToPrList)
            break

            case 'pr16':
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun9-3.userapi.com/impg/DbS2JcoO2DH9dRtQvuYmrzO_TwV0ll63jSAZEg/uMItlSnKSDc.jpg?size=897x1280&quality=96&sign=6b8b65f524e6c592cf2f5b8b1febc101&type=album',backToPrList)
            break

            case 'pr17':
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun9-54.userapi.com/impg/8wSYFEWDkaE_KC7bjVuV6nV5TelmGJOWlfqHPA/DiADzRsjOOg.jpg?size=897x1280&quality=95&sign=27fb6a428b2223072423ed91e595d0e1&type=album',backToPrList)
            break

            case 'pr18':
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun9-6.userapi.com/impg/f_aY7Ee1Ui0Bdyuey4G_qwF5bytE3aS_wWQGeQ/3JRo_NR6b7k.jpg?size=896x1280&quality=95&sign=b6ce1a87805dcf9b69e22a851791c4a3&type=album',backToPrList)
            break


        }
    })

    bot.on("message", async msg => {
        
        const user = msg.from.first_name
        const text = msg.text
        const chatId = msg.chat.id
        console.log(text)

        if (text === '/start') {
            bot.sendMessage(chatId, `${user}, приветствую вас. С помощью нашего бота вы сможете приобретсти у нас готовые програмы питания.`, programs)

        }
        
    })

}

start()

setInterval(() => {
    let t = formatTime(new Date())
    if (t === `19:30:00`) {
    bufSC += startCounter
    bot.sendMessage(myId, `Сегодня: \n\n\ ${startCounter} раз был запущен бот через команду /start  \n\n\n\nС момента старта бота ${sd} в ${st}: \n\n\ ${bufSC} раз был запущен бот через команду /start`  );
    bot.sendMessage(AuthorId, `Сегодня: \n\n\ ${startCounter} раз был запущен бот через команду /start \n\n\n\nС момента старта бота ${sd} в ${st}: \n\n\ ${bufSC} раз был запущен бот через команду /start `);
    startCounter = 0
    }
}, 500)