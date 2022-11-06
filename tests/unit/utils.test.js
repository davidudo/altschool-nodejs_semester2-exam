/* eslint-disable no-undef */
const readTime = require('../../src/utils/readtime.utils');

describe('Utils', () => {
  const text = 'As with so many technologies, Node.js has its champions and its detractors. But there\'s no denying that it is widely used by some powerhouse websites, including Uber, LinkedIn, and PayPal—which makes it a powerhouse no matter which side of the debate you\'re on. And popular technologies used by big brands are always something to pay attention to when you\'re making career choices. So what is Node.js? Node.js is an open source cross-platform runtime environment written in JavaScript. It is built on Chrome\'s V8 JavaScript engine, which parses and executes the JavaScript code. Node uses an event-driven, non-blocking I/O model, which makes it fast and lightweight. This programming model is one of the main reasons why Node has become so popular. Node is best suited for building software and applications that require real-time, synchronous interactions such as chat apps and websites. Yet it also has other uses and benefits which make it popular among developers, as well, all contributing to its popularity.';

  it('should return the total number of books', () => {
    expect(readTime(text)).toBe(2);
  });
});
