const {
  TELEGRAM_TOKEN,
  TELEGRAM_CHAT_ID
} = require('../config');
const TG = require('telegram-bot-api');

class TelegramClient {
  constructor(TELEGRAM_TOKEN, TELEGRAM_CHAT_ID) {
    this._telegramApi = new TG({ token: TELEGRAM_TOKEN });
    this._chatId = TELEGRAM_CHAT_ID;
    this._mp = new TG.GetUpdateMessageProvider();
  }

  init() {
    this._telegramApi.setMessageProvider(this._mp);
    this._telegramApi.start()
      .then(() => {
        console.log('telegram listner started')
      }).catch(console.err)

    this._telegramApi.on('update', update => {
      console.log(update);
    });
  }

  shareLink(url, fileName = 'song') {
    this._telegramApi.sendMessage({
      chat_id: this._chatId,
      text: `🎵 *${fileName.slice(0, 4097)}*`,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Download',
              url
            }
          ]
        ]
      }
    })
  }
};

const telegramClient = new TelegramClient(TELEGRAM_TOKEN, TELEGRAM_CHAT_ID);

module.exports = { telegramClient };
