const functions = require('firebase-functions');
const app = require('express')();
const main = require('express')();
const cors = require('cors');

const FBAuth = require('./utils/fbAuth');
const {
    db
} = require('./utils/admin');
const {
    warmup,
    signup,
    login
} = require('./routes/users');

main.use(cors());
main.use('/v1', app)
exports.api = functions.https.onRequest(main);

// For Testing Get API
app.get('/warmup', warmup);

// Signup routes
app.post('/signup', signup);
app.post('/login', login);