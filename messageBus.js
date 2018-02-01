class MessageBus {
  constructor() {
    this.channels = {};
    this.subscribers = {};
  }
  subscribe(options) {
    if (!this.channels[options.channel]) {
      this.channels[options.channel] = {};
    }
    if (!this.channels[options.channel][options.topic]) {
      this.channels[options.channel][options.topic] = [];
    }
    this.channels[options.channel][options.topic].push(options.callback);
  }
  publish(options) {
    if (this.channels[options.channel] && this.channels[options.channel][options.topic]) {
      this.channels[options.channel][options.topic].forEach((cb) => {
        cb(options.data);
      })
    }

  }
}

module.exports = MessageBus;