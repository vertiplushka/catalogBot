module.exports = {
    token: '6229704049:AAFcozcCVvmOTnG8M-bAMAoMY9djwaoWDlw',
    programs: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Посмотреть готовые программы', callback_data: 'programs'}]
            ]
        })
    },
    programsList : {
        reply_markup: JSON.stringify({
            inline_keyboard: [
            [{text: 'Завтрак', callback_data: 'pr1'}, {text: 'Снижение веса', callback_data: 'pr2'}],
            [{text: 'Турбо-напиток', callback_data: 'pr3'}, {text: 'Поддержка зрения', callback_data: 'pr4'}],
            [{text: 'Поддержка пищеварения', callback_data: 'pr5'}, {text: 'Поддержка сердца и сосудов', callback_data: 'pr6'}],
            [{text: 'Поддержка иммунитета', callback_data: 'pr7'}, {text: 'Активное долголетие', callback_data: 'pr8'}],
            [{text: 'Поддержка опорно-двигательного аппарата', callback_data: 'pr9'}],
            [{text: 'Сбалансированное питание', callback_data: 'pr10'}, {text: 'Набор мышечной массы', callback_data: 'pr11'}],
            [{text: 'Мужская', callback_data: 'pr12'}, {text: 'Женская', callback_data: 'pr13'}, {text: 'Спортивная', callback_data: 'pr14'}],
            [{text: 'Энергия', callback_data: 'pr15'}, {text: 'Здоровые перекусы', callback_data: 'pr16'}],
            [{text: 'Вечеринка', callback_data: 'pr17'},  {text: 'Сияющая кожа', callback_data: 'pr18'}]

            ]
        })
    },
}