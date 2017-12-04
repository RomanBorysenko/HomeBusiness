'use strict';

const express = require('express');
const path = require('path');
//const fallback = require('express-history-api-fallback');
const request = require('request');
const port = 5000;
const bodyParser = require('body-parser');

const app = express();
const publicDir = path.join(__dirname, 'public');

const router = express.Router();

//app.use(express.static(publicDir));

//app.use(fallback(path.join(publicDir, 'index.html')));

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
//now we can set the route path & initialize the API

//Use our router configuration when we call /api


router.route('/login')
    .post(function(req, res) {
        if (req.body.email && req.body.password) {
                if (req.body.email === 'test@jelvix.com' && req.body.password === 'test@jelvix.com') {
                    res.json({ isAuth: true, success: true, status: 200, subject: 'Success', accessToken: '33333333333'});
                } else {
                    res.json({ isAuth: false, success: true});
                }
        } else {
            res.json({ success: false, message: req.body.email});
        }
    });

router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

// router.post('/login', function(req, res) {
//     res.json({ message: req.body.toString()});
// });

app.use('/api', router);

app.get('/email', function(req, res) {
    console.log('It is redirect!');
    res.json({ redirectUrl: '/recovery'});
});

app.listen(port);
console.log('The node server is running ' + port);