module.exports = function(noOfChars) {
  var chars = [];

  for (var i = 0; i < 26; i++) {
    chars.push(String.fromCharCode(i+65));
  }
  for( var i = 0; i < 10; i++) {
    chars.push(i.toString());
  }
  // chars = chars.concat(specialChars.split(' '));

  code = [];
  for( var i = 0; i < noOfChars; i++) {
    randomChar = Math.floor(Math.random() * chars.length);
    code.push(chars[randomChar]);
  }
  return code.join('');
}
