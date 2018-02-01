const MessageBus = require('./messageBus');

test('messageBus constructor exists', () => {
  expect(new MessageBus).toBeDefined();
})

test('messageBus should have a publish method', () => {
  let test = new MessageBus;
  expect(test.publish).toBeDefined();
})

test('messageBus should have a subscribe method', () => {
  let test = new MessageBus;
  expect(test.subscribe).toBeDefined();
})

test('messageBus subscribers should receive published messages with the same label and channel', () => {
  let test = new MessageBus;
  test.subscribe({channel: 'testchannel', topic: 'test', callback: (payload) => {
      expect(payload).toEqual({one: 1, two: 2});
    }
  })
  test.publish({ channel: 'testchannel', topic: 'test', data: { one: 1, two: 2 }});
})

test('multiple messageBus subscribers should receive published messages with the same label', () => {
  let test = new MessageBus;
  test.subscribe({
    channel: 'testchannel', topic: 'test', callback: (payload) => {
      expect(payload).toEqual({ one: 1, two: 2 });
    }
  })
  test.subscribe({
    channel: 'testchannel', topic: 'test', callback: (payload) => {
      expect(payload).toEqual({ one: 1, two: 2 });
    }
  })
  test.publish({ channel: 'testchannel', topic: 'test', data: { one: 1, two: 2 } });
})

test('messageBus subscribers should not receive published messages to the same channel, but a different label', () => {
  let test = new MessageBus;
  test.subscribe({
    channel: 'testchannel', topic: 'othertest', callback: (payload) => {
      expect(payload).not.toEqual({ one: 1, two: 2 });
    }
  })
  test.publish({ channel: 'testchannel', topic: 'test', data: { one: 1, two: 2 } });
  test.publish({ channel: 'testchannel', topic: 'test', data: { three: 3, four: 4 } });
})

test('messageBus subscribers should not receive published messages to the same label, but a different channel', () => {
  let test = new MessageBus;
  test.subscribe({
    channel: 'othertestchannel', topic: 'test', callback: (payload) => {
      expect(payload).not.toEqual({ one: 1, two: 2 });
    }
  })
  test.publish({ channel: 'testchannel', topic: 'test', data: { one: 1, two: 2 } });
  test.publish({ channel: 'othertestchannel', topic: 'test', data: { three: 3, four: 4 } });
})

