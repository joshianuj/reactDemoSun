import express from 'express';

// Controllers
import controllers from './controllers';

// Middlewares
import bodyParser from 'body-parser';

// Error middlewares
import errorHandler from './middlewares/error/errorHandler';
import resourceNotFoundHandler from './middlewares/error/resourceNotFoundHandler';

import * as db from './utils/db';

//Location
import Location from './models/Location';

//seeds
import * as seedLocation from './seeds/location';

var path = require('path');

const app = express();

// Configuration
app.use(function(req, res, next) {
    // Allow CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html')
});


app.set('port', process.env.PORT || '8081');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
db.connection();

//seeding location after database connection
seedLocation.enterLocations(Location);


app.use(controllers);

// 500 Internal Server Error
app.use(errorHandler);

// 404 Not Found
app.use(resourceNotFoundHandler);


app.listen(app.get('port'), (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", 8081, 8081);
    }
});
