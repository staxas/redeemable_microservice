var mongoose = require('mongoose');
var Hapi = require('hapi');

var config = require('./config')

var Routes = require('.routes/routes');

var Redeemable = require('./models/redeemable.model');

mongoose.connect('mongodb://' + config.database.host + '/' + config.database.db);

var server = new Hapi.Server();

server.connection({
  port: config.server.port,
  host: config.server.host,
  routes: {
    cors: true
  }
});

server.route(Routes);

// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
