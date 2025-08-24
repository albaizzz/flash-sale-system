const { Redis } = require('ioredis');

const connection = new Redis({
  host: '127.0.0.1',
  port: 6379
  // password: "kalau Redis ada password"
});

module.exports = connection;