const line = require('@line/bot-sdk');
const Config = require('./config.json')

// create LINE SDK config from env variables
const config = {
  channelAccessToken: Config.accessToken,
  channelSecret: Config.secretKey
};

// create LINE SDK client
const client = new line.Client(config);

//Convo Script
const message = {
  type: 'yolo',
  text: 'Hello World!'
};

client.replyMessage('<replyToken>', message)
  .then(() => {
    ...
  })
  .catch((err) => {
    // error handling
  });