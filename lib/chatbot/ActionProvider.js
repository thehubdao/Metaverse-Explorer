class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.createClientMessage = createClientMessage
    this.setState = setStateFunc;
  }

  //handlers
  greet = () => {
    this.addMessageToState([
      this.createChatBotMessage('Hello. Nice to meet you.')
    ])
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages].concat(message)
    }));
  };
};

export default ActionProvider;