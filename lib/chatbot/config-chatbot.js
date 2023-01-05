import { createCustomMessage, } from 'react-chatbot-kit';

// Custom Messages
import Greeting from '../../components/Chatbot/Greeting';
import ObtainCurrency from '../../components/Chatbot/ObtainCurrency';
import OwnCurrencyQuestion from '../../components/Chatbot/OwnCurrencyQuestion';
import SelectCurrency from '../../components/Chatbot/SelectCurrency';

const botName = 'MGH app purchase chatbot';

const config = {
  botName,
  initialMessages: [
    createCustomMessage('Mgh Greeting', 'greeting')
  ],
  customMessages: {
    greeting: (props) => <Greeting {...props} />,
  },
  widgets: [
    {
      widgetName: 'select_currency',
      widgetFunc: (props) => <SelectCurrency {...props} />
    },
    {
      widgetName: 'own_currency_question',
      widgetFunc: (props) => <OwnCurrencyQuestion {...props} />
    },
    {
      widgetName: 'obtain_currency',
      widgetFunc: (props) => <ObtainCurrency {...props} />
    }
  ],
};

export default config;