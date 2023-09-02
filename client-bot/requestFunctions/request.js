require('dotenv').config()
const axios = require('axios');
const apitoken = process.env.APIKEY

async function request(method, path, data = '') {
    try {
        const config = {
            method: method,
            maxBodyLength: Infinity,
            url: path,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apitoken}`
            },
            data: JSON.stringify(data)
        };

        return axios.request(config)
    } catch (error) {
        console.log('Ошибка запроса', error)
    }
}

module.exports = {
    request,
}