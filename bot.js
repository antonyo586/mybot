const { Telegraf } = require('telegraf');

const bot = new Telegraf('7769985700:AAFslhp9tMVAFi3pswejwjsia0UBbTPJjQQ'); // Вставь свой токен

// ID приватных каналов (замени на свои)
const CHANNELS = [
    '-1002453596396',  // ID первого приватного канала
    '-1002273108877',  // ID второго приватного канала
    '-1002175702436'   // ID третьего приватного канала
];

bot.start((ctx) => {
    ctx.reply(
        'Здравствуйте, это тик ток телеграмм бот!\n\n' +
        'В данный момент бот проходит тестирование, исправляются баги, и совсем скоро он запустится в Telegram!\n\n' +
        'Чтобы получить ссылку на этого бота, вам нужно всего лишь подписаться на партнеров, и как только бот запустится, я пришлю вам ссылку на приложение!\n\n' +
        'До окончания тестирования осталось 3 дня 17 часов',
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '📢 Подписаться на партнёров', url: 'https://t.me/joinchat/XXXXX' }],
                    [{ text: '📢 Подписаться на партнёров', url: 'https://t.me/joinchat/YYYYY' }],
                    [{ text: '📢 Подписаться на партнёров', url: 'https://t.me/joinchat/ZZZZZ' }],
                    [{ text: '✅ Проверить подписку', callback_data: 'check' }]
                ]
            }
        }
    );
});

bot.action('check', async (ctx) => {
    try {
        let allSubscribed = true;

        for (const channel of CHANNELS) {
            const chatMember = await ctx.telegram.getChatMember(channel, ctx.from.id);
            if (!['member', 'administrator', 'creator'].includes(chatMember.status)) {
                allSubscribed = false;
                break;
            }
        }

        await ctx.answerCbQuery(); // Закрываем индикатор загрузки

        if (allSubscribed) {
            await ctx.reply('✅ Спасибо за подписку! Мы уведомим вас, когда бот запустится.');
        } else {
            await ctx.reply('❌ Вы не подписаны на все каналы. Подпишитесь и попробуйте снова.');
        }
    } catch (error) {
        console.error('Ошибка проверки подписки:', error);
        await ctx.reply('❌ Ошибка проверки подписки. Убедитесь, что бот добавлен в администраторы всех каналов.');
    }
});

bot.launch();
console.log('Бот запущен!');
