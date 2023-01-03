import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'MGH app purchase chatbot';

const config = {
  botName,
  initialMessages: [
    createChatBotMessage(`You are about to acquire tokenized square meters of an Office in XXXX`),
    createChatBotMessage(`The price per m^2 for this object is: XXXX`, { delay: 1000 }),
    createChatBotMessage(`Your commitment in Office XXXX will be stored as NFTs on the Polygon Blockchain`, { widget: 'options_1', delay: 2000 }),
  ],
  widgets: [],
  customStyles: { chatButton: { backgroundColor: '#5ccc9d' } },
};

export default config;