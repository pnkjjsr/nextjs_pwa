const functions = require('firebase-functions');
const app = require('express')();
const main = require('express')();
const cors = require('cors');

const FBAuth = require('./utils/fbAuth');
const {
    db
} = require('./utils/admin');
const {
    signup,
    location,
    login,
    getUserDetails
} = require('./routes/users');

main.use(cors());
main.use('/v1', app)
exports.api = functions.https.onRequest(main);

// User routes
app.post('/signup', signup);
app.post('/location', location);
app.post('/login', login);
app.post('/user', getUserDetails);