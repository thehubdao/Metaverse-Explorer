class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) { const lowercase = message.toLowerCase(); }
}

export default MessageParser;