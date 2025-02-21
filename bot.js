const { Telegraf } = require('telegraf');

const bot = new Telegraf('7769985700:AAFslhp9tMVAFi3pswejwjsia0UBbTPJjQQ');

bot.start((ctx) => {
    ctx.reply('Здравствуйте, это тик ток телеграмм бот!\n\n' +
        'В данный момент бот проходит тестирование, исправляются баги, и совсем скоро он запустится в Telegram!\n\n' +
        'Чтобы получить ссылку на этого бота, вам нужно всего лишь подписаться на партнеров, и как только бот запустится, я пришлю вам ссылку на приложение!\n\n' +
        'До окончания тестирования осталось 3 дня 17 часов', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Подписаться на партнеров', callback_data: 'subscribe' }]
            ]
        }
    });
});

bot.action('subscribe', (ctx) => {
    ctx.reply('Вот ссылки на партнеров:\n1. https://t.me/partner1\n2. https://t.me/partner2\n3. https://t.me/partner3\n\nПосле подписки нажмите "Проверить".', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Проверить', callback_data: 'check' }]
            ]
        }
    });
});

bot.action('check', (ctx) => {
    ctx.reply('Спасибо за подписку! Мы уведомим вас, когда бот запустится.');
});

bot.launch();
console.log('Бот запущен!');
