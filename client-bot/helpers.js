function parseInput(input) {
    const parts = input.split(':');
    const action = parts[0];
    const type = parts[1];
    const id = parts[2] ? parseInt(parts[2]) : null;

    return {
        action: action,
        type: type,
        id: id
    };
}

function formatDate(inputDate) {
    const months = [
        "января", "февраля", "марта",
        "апреля", "мая", "июня",
        "июля", "августа", "сентября",
        "октября", "ноября", "декабря"
    ];

    const date = new Date(inputDate);
    date.setUTCHours(date.getUTCHours() + 7 ); // Добавляем 4 часа к UTC времени
    const day = date.getUTCDate();
    const monthIndex = date.getUTCMonth();
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    const formattedDate = `${day} ${months[monthIndex]} ${year} ${hours}:${minutes}`;

    return formattedDate;
}


module.exports = {
    parseInput,
    formatDate
}