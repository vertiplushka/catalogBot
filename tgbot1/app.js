const telegramBot = require('node-telegram-bot-api')
const {token, helloStr, form, replyForm, aboutForm, noReplyForm, aboutStr, formStr, timeForm, phList1, phList2, phList3, phList4, phList5, chatForm} = require('./addons')

const bot = new telegramBot(token, {polling: true})

const myId = 732162115
const AuthorId = 451878659

let startCounter = 0
let callCounter = 0
let writeCounter = 0
let bufCC = 0
let bufSC = 0
let bufWC = 0

let isForm = false
let str = ''



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

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(d) {
    var date = new Date(d)
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('.');
  }

  const join = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Присоедениться к чату', url: 'https://t.me/+dqcmDmtmf4dkZmE6'}]
        ]
    })
  }
  const helloForm = {
    reply_markup: JSON.stringify({
        inline_keyboard :[
            [{text: 'Да', callback_data: 'yes'}, {text: 'Нет', callback_data: 'no'}],
            [{text: 'Узнать подробнее о марафоне', callback_data: 'about'}],
            [{text: 'Посмотреть результаты участников', callback_data: 'results'}],
            [{text: 'Наши продуктовые программы', url: 'https://t.me/Procto_vkusno_sellbot'}]
        ]
    })
}

const start = async () => {


    bot.on("polling_error", console.log);

    bot.on('callback_query', quere => {
        const chatId = quere.message.chat.id
        const data = quere.data
        const user = quere.from.first_name
        const messageId = quere.message.message_id

    
        let d1 = new Date()
        let d2 = new Date()
        let d3 = new Date()
        let d4 = new Date()
        let d5 = new Date()
        let d6 = new Date()
        let d7 = new Date()
        let d8 = new Date()
        let d9 = new Date()
        
        
        d1 = formatDate(d1)
        d2 = formatDate(d2.setDate(d2.getDate() + 1))
        d3 = formatDate(d3.setDate(d3.getDate() + 2))
        d4 = formatDate(d4.setDate(d4.getDate() + 3))
        d5 = formatDate(d5.setDate(d5.getDate() + 4))
        d6 = formatDate(d6.setDate(d6.getDate() + 5))
        d7 = formatDate(d7.setDate(d7.getDate() + 6))
        d8 = formatDate(d8.setDate(d8.getDate() + 7))
        d9 = formatDate(d9.setDate(d9.getDate() + 8))   

        switch (data) {

            case 'yes':
            case 'replyYes':
                bot.editMessageText('Кстати, скоро старт следующего забега! Пойдешь с нами?', {message_id: messageId, chat_id: chatId})
                bot.sendMessage(chatId, 'Для того, чтобы дать рекомендации по питанию надо заполнить анкету', form)
            break
            
            case 'no':
                bot.editMessageText('Кстати, скоро старт следующего забега! Пойдешь с нами?', {message_id: messageId, chat_id: chatId})
                bot.sendMessage(chatId, `${user}, вы уверены?`, noReplyForm)
            break

            case 'about':
                bot.editMessageText('Кстати, скоро старт следующего забега! Пойдешь с нами?', {message_id: messageId, chat_id: chatId})
                bot.sendMessage(chatId, aboutStr, aboutForm)
            break

            case 'next':
                bot.sendMessage(chatId, 'Как вам будет удобно заполнить анкету?', replyForm)
            break

            case 'write':
                bot.sendMessage(chatId, 'Заполните приложенную ниже анкету. Мы сразу же получим ваш ответ')
                bot.sendMessage(chatId, formStr)
                isForm = true
            break

            case 'audio':
            case 'video':
            const dateForm = {
                reply_markup: JSON.stringify({
                    inline_keyboard :[
                        [{text: `${d1}`, callback_data: '1'}, {text: `${d2}`, callback_data: '2'}, {text: `${d3}`, callback_data: '3'}],
                        [{text: `${d4}`, callback_data: '4'}, {text: `${d5}`, callback_data: '5'}, {text: `${d6}`, callback_data: '6'}],
                        [{text: `${d7}`, callback_data: '7'}, {text: `${d8}`, callback_data: '8'}, {text: `${d9}`, callback_data: '9'}]
                    ]
                })
            }   
                callCounter += 1
                bot.sendMessage(chatId, 'Выберите дату, когда с вами будет удобно связаться', dateForm)
            break


            case 'results':
                bot.editMessageText('Кстати, скоро старт следующего забега! Пойдешь с нами?', {message_id: messageId, chat_id: chatId})
                bot.sendMessage(chatId, 'В этом разделе вы можете ознакомиться с результатами наших участников. \n \n \n Желаете добиться таких же результатов? Заполняйте анкету и присоединяйтесь к нам!')
                bot.sendPhoto(chatId, 'https://sun9-west.userapi.com/sun9-66/s/v1/ig2/zG9TN1X009abg-jCZJCmIGtPN6twTOzJEq-KKgD_M5yy_xAhO12AFqmqdRASbyrqh3yPg5yk__VaEMDGeE2RYo1z.jpg?size=1448x1448&quality=95&type=album', phList1)
            break

            case 'list1' :
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun9-west.userapi.com/sun9-66/s/v1/ig2/zG9TN1X009abg-jCZJCmIGtPN6twTOzJEq-KKgD_M5yy_xAhO12AFqmqdRASbyrqh3yPg5yk__VaEMDGeE2RYo1z.jpg?size=1448x1448&quality=95&type=album', phList1)
            break
            
            case 'list2' :
                
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun9-west.userapi.com/sun9-72/s/v1/ig2/5Fdb-FXP6s_tBXnMF0qW0XnlyqQkD78vJKvU29OcOoT2flCDeqvKj0mzQgQyVJxCb7GKLb3p6PpzUGSSmUVuNc-J.jpg?size=1448x1448&quality=95&type=album', phList2)
            break

            case 'list3' :
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun9-north.userapi.com/sun9-79/s/v1/ig2/K_Domn4HusaED6qoaaD0uKiRrfWgEuSBr3OxlgSdKmGHx1-ePjY9Z2ep-vF485ilnO21JzyqrQOG5-2_R3i625bR.jpg?size=1448x1448&quality=95&type=album', phList3)
            break

            case 'list4' :
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun4.userapi.com/sun4-10/s/v1/ig2/G1sV6mYXdUkokW-ZPUFW7vFgokpmaITOg_8UI3qbm7DvsBlI5seZeSLv0RPSVLB5Y3ASQIzG3RopkdO2zE_I1mmb.jpg?size=1448x1448&quality=95&type=album', phList4)
            break

            case 'list5' :
                bot.deleteMessage(chatId, messageId)
                bot.sendPhoto(chatId, 'https://sun4.userapi.com/sun4-16/s/v1/ig2/GwPaS-ognAe0KyeCf7qlAqVSxWJzBAnMWDrt9nNthGdlPoe7iXpbCS7MU8HKbhpew5DnqdTNXZ6f8nlCKfK3bTg8.jpg?size=1448x1448&quality=95&type=album', phList5)
            break

            case 'back':
                bot.deleteMessage(chatId,messageId)
                setTimeout(()=>{
                    bot.sendMessage(chatId, `Доброго времени суток, ${user}! ` + helloStr)
                }, 1000)
                
                setTimeout(()=>{
                    bot.sendMessage(chatId, 'Кстати, скоро старт следующего забега! Пойдешь с нами?', helloForm);
                }, 1500)
                
            break

            case 'Join':
                bot.sendMessage(chatId, 'Ваша ссылка на вступление в чат', join)
            break

            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                bot.deleteMessage(chatId, messageId)
                let buf = new Date()
                str = formatDate(buf.setDate(buf.getDate() + parseInt(data)))
                buf = ''
                bot.sendMessage(chatId, 'Выберите удобное для вас время \n Учтите, тут указан московский часовой пояс', timeForm)
            break
            
            case '8:00':
            case '9:00':
            case '10:00':
            case '11:00':
            case '12:00':
            case '13:00':
            case '14:00':
            case '15:00':
            case '16:00':
            case '17:00':
                bot.deleteMessage(chatId, messageId)
                if (str != '') {
                    bot.sendMessage(chatId, `Мы с вами свяжемся ${str} в ${data}. Для изменения даты или времени, напишите нам - @VALERY182`)
                    bot.sendMessage(myId, `Новая заявка на звонок от @${quere.from.username}: ${str} в ${data}`)
                    bot.sendMessage(chatId, 'Желаете вступить в наш телеграм-чат и подписаться на рассылку?', chatForm)
                        
                }
                str = ''
            break
        }
     })


    bot.on('message', async msg => {
        const user = msg.from.first_name;
        const text = msg.text;
        const chatId = msg.chat.id;
        //console.log(msg)

        if (text === '/start') {
            //console.log(chatId)
            startCounter+=1 
            await bot.sendMessage(chatId, `Доброго времени суток, ${user}! ` + helloStr)
            return bot.sendMessage(chatId, 'Кстати, скоро старт следующего забега! Пойдешь с нами?', helloForm);
        }
        else {
            if (isForm){
                let messageId = msg.message_id
                isForm = false
                //console.log (user, text, chatId);
                writeCounter += 1
                await bot.sendMessage(myId, `Новая заполненная анкета от ${msg.from.first_name} ${msg.from.last_name}`)
                await bot.sendMessage(chatId, 'Ваша анкета получена, в скором времени мы ее обработаем.')
                await bot.sendMessage(chatId, 'Желаете вступить в наш телеграм-чат и подписаться на рассылку?', chatForm)
                return bot.forwardMessage(myId, chatId, messageId)
                
            }   
            else {
                await bot.sendMessage(chatId, `Прости, я тебя не понял `)
                return bot.sendMessage(chatId, 'Напиши команду /start еще раз');  
            }        
        }
})    
}


setInterval(() => {
    let t = formatTime(new Date())
    if (t === `19:30:00`) {
    
    bufSC += startCounter
    bufWC += writeCounter
    bufCC += callCounter
    console.log(`${formatDate(new Date())} - working`)

    bot.sendMessage(myId, `Сегодня: \n\n\ ${startCounter} раз был запущен бот через команду /start \n ${writeCounter} письменных анкет заполнено \n ${callCounter} заявок на звонки оставлено \n\n\n\nС момента старта бота ${sd} в ${st}: \n\n\ ${bufSC} раз был запущен бот через команду /start \n ${bufWC} письменных анкет заполнено \n ${bufCC} заявок на звонки оставлено`  );
    bot.sendMessage(AuthorId, `Сегодня: \n\n\ ${startCounter} раз был запущен бот через команду /start \n ${writeCounter} письменных анкет заполнено \n ${callCounter} заявок на звонки оставлено \n\n\n\nС момента старта бота ${sd} в ${st}: \n\n\ ${bufSC} раз был запущен бот через команду /start \n ${bufWC} письменных анкет заполнено \n ${bufCC} заявок на звонки оставлено`  );
    startCounter = 0
    writeCounter = 0
    callCounter = 0
    }}, 500)



let sd = formatDate(new Date())
let st = formatTime(new Date())

console.log(`Started at ${sd} ${st}`)
start()
