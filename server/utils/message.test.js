const expect = require('expect');

var {
  generateMessage,
  generateLocationMessage
} = require('./message')

describe('generateMessage', () => {
  it('should generate the correct message', () => {
    var from = 'Jen'
    var text = 'Some message'
    var message = generateMessage(from, text)

    expect(typeof message.createdAt).toBe('number')
    expect(message).toMatchObject({
      from,
      text
    })
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = "Dogucan"
    var latitude = 1
    var longitude = 1
    var url = `https://www.google.com/maps?q=${latitude},${longitude}`
    var message = generateLocationMessage(from, latitude, longitude)

    expect(typeof message.createdAt).toBe('number')
    expect(message).toMatchObject({
      from,
      url
    })
  })
})
