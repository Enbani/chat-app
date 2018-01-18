const expect = require('expect');

var {generateMessage} = require('./message');
var {generateLocationMessage} = require('./message');


describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Eazy-E';
    var text = 'Keep it real from head to heel';
    var res = generateMessage(from, text);

    expect(res.from).toBe(from);
    expect(res.text).toBe(text);
    expect(res.createdAt).toBeA('number');
  });
});


describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var lat = 1;
    var lng = 1;
    var from = 'GZA';

    var res = generateLocationMessage(from, lat, lng);
    expect(res.from).toBe(from);
    expect(res.createdAt).toBeA('number');
    expect(res.url).toBe(`https://www.google.com/maps?${lat},${lng}`);

  });
});
