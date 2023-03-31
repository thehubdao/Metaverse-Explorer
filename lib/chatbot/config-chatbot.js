import { createCustomMessage, } from 'react-chatbot-kit';

import WhiteSpace from '../../components/Chatbot/WhiteSpace';

// Custom Messages to b2b
import Greeting from '../../components/Chatbot/Greeting';
import InputCurrency from '../../components/Chatbot/InputCurrency';
import LastMessage from '../../components/Chatbot/LastMessage';
import ObtainCurrency from '../../components/Chatbot/ObtainCurrency';
import OwnCurrencyQuestion from '../../components/Chatbot/OwnCurrencyQuestion';
import SelectCurrency from '../../components/Chatbot/SelectCurrency';

const botName = 'MGH app purchase chatbot';

// This is the b2b config chatbot
export const configB2b = {
  botName,
  initialMessages: [
    createCustomMessage('Mgh Greeting', 'greeting')
  ],
  customMessages: {
    greeting: (props) => <Greeting {...props} />,
    space: (props) => <WhiteSpace {...props} />
  },
  state: {
    currency: 'USDC',
    amount: 0
  },
  widgets: [
    {
      widgetName: 'select_currency',
      widgetFunc: (props) => <SelectCurrency {...props} />,
      mapStateToProps: ['currency']
    },
    {
      widgetName: 'own_currency_question',
      widgetFunc: (props) => <OwnCurrencyQuestion {...props} />,
      mapStateToProps: ['currency']
    },
    {
      widgetName: 'obtain_currency',
      widgetFunc: (props) => <ObtainCurrency {...props} />
    },
    {
      widgetName: 'input_currency',
      widgetFunc: (props) => <InputCurrency {...props}
        min={350}
        showInputAmount={true}
        buttonsInfo={[
          {
            label: '$350',
            amount: 350
          },
          {
            label: '$1050',
            amount: 1050
          },
          {
            label: '$1400',
            amount: 1400
          }
        ]}
        buyType='B2B'
      />,
      mapStateToProps: ['currency']
    },
    {
      widgetName: 'go_back',
      widgetFunc: (props) => <LastMessage {...props} />
    }
  ],
};

// This is the b2b config chatbot
export const configB2c = {
  botName,
  initialMessages: [
    createCustomMessage('Mgh Greeting', 'greeting')
  ],
  customMessages: {
    greeting: (props) => <Greeting {...props} />,
    space: (props) => <WhiteSpace {...props} />
  },
  state: {
    currency: 'USDC',
    amount: 0
  },
  widgets: [
    {
      widgetName: 'select_currency',
      widgetFunc: (props) => <SelectCurrency {...props} />,
      mapStateToProps: ['currency']
    },
    {
      widgetName: 'own_currency_question',
      widgetFunc: (props) => <OwnCurrencyQuestion {...props} />,
      mapStateToProps: ['currency']
    },
    {
      widgetName: 'obtain_currency',
      widgetFunc: (props) => <ObtainCurrency {...props} />
    },
    {
      widgetName: 'input_currency',
      widgetFunc: (props) => <InputCurrency {...props}
        min={10}
        showInputAmount={false}
        buttonsInfo={[
          {
            label: '$10',
            amount: 10,
            intervals:1
          },
          {
            label: '$21 (save 30%)',
            amount: 21,
            intervals:2
          },
          {
            label: '$60 (save 50%)',
            amount: 60,
            intervals:3
          }
        ]}
        buyType='B2C'
      />,
      mapStateToProps: ['currency']
    },
    {
      widgetName: 'go_back',
      widgetFunc: (props) => <LastMessage {...props} />
    }
  ],
};