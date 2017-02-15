import mongoose from 'mongoose';

const envConfig = require('../config/env');

const CONFIG = {
  host: 'localhost',
  port: 14375,
  db: envConfig.dbName,
  options: {
    server: {
      auto_reconnect: true,
      poolSize: 10,
      socketOptions: {
        keepAlive: 1
      }
    },
    db: {
      numberOfRetries: 10,
      retryMiliSeconds: 1000
    }
  }
};

export function connection(){
	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function callback(){
	  console.log('Connected to DB');
	});

	mongoose.connect("mongodb://localhost:27017/test", CONFIG.options);

  mongoose.Promise = Promise;

	return mongoose;
}
