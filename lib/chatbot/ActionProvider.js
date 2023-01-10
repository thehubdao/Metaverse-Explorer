class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage, stateRefCurrent, createCustomMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.createClientMessage = createClientMessage
    this.setState = setStateFunc;
    this.stateRefCurrent = stateRefCurrent
    this.createCustomMessage = createCustomMessage;

  }

  //handlers
  greet = () => { this.addMessageToState([this.createChatBotMessage('Hello. Nice to meet you.')]) };

  EjectPlanExplanation = () => {
    this.addMessageToState([
      this.createCustomMessage('whiteSpace', 'space'),
      this.createClientMessage('Logged'),
      this.createChatBotMessage('The API can be accessed through the funding of a Smart Contract. The monthly subscription fee is $350 for 30 days and unlimited requests'),
      this.createChatBotMessage('You can choose for how many months you want to subscribe to the service. You will approve a USD amount and the contract will withdraw the money at a monthly basis'),
      this.createChatBotMessage('Select currency for payment', { widget: 'select_currency' })
    ])
  } 

  handleSelectCurrency = (currency) => {
    this.addMessageToState([
      this.createCustomMessage('whiteSpace', 'space'),
      this.createClientMessage(currency),
      this.createChatBotMessage(`Do you own any ${currency}?`, { widget: 'own_currency_question' })
    ])
  }

  PositiveAnswerOwnCurrency = () => {
    this.addMessageToState([
      this.createCustomMessage('whiteSpace', 'space'),
      this.createClientMessage('Yes'),
      this.createChatBotMessage(`Enter USD amount that you want to fund the contract with`, { widget: 'input_currency' })
    ])
  }

  NegativeAnswerOwnCurrency = () => {
    this.addMessageToState([
      this.createCustomMessage('whiteSpace', 'space'),
      this.createClientMessage('No', { widget: 'obtain_currency' }),
    ])
  }

  handleLastMessage = (amount) => {
    this.addMessageToState([
      this.createCustomMessage('whiteSpace', 'space'),
      this.createClientMessage(amount),
      this.createChatBotMessage('Congratulations'),
      this.createChatBotMessage('You just subscribed to our API using the wallet address: xxx.'),
      this.createChatBotMessage('Your subscription is valid until xx.xx.xxxx', { widget: 'go_back' })
    ])
  }

  // Message controller
  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages].concat(message)
    }));
  };
};

export default ActionProvider;