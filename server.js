var Hapi = require("hapi");
var Legendary = require("legendary");

var Promise = Legendary.Promise;
var timed = Legendary.timed;

var pack = new Hapi.Pack();

// Create a server with a host and port
var server = new Hapi.Server('localhost', 8000);

// Load in hapi-promises:
server.pack.allow({ ext: true }).require('hapi-promises', function (err) {
    if (err) {
        throw err;
    }
});


// Add the route
server.route({
  method: 'GET',
  path: '/',
  handler: function () {
    this.reply('hello world');
  }
});

server.route({
  method: 'GET',
  path: '/delayed',
  handler: function () {
    var delayed = timed.delay(1000).then(function(){
      return "delayed";
    });

    console.log(delayed)

    this.reply({ promise: delayed });
  }
});

server.route({
  method: 'GET',
  path: '/dead',
  handler: function () {
    var delayed = timed.delay(50).then(function(){
      throw new Error("Promise Dead");
    });

    console.log(delayed);

    this.reply({ promise: delayed });
  }
});

// Start the server
server.start();

