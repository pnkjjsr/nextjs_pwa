const functions = require('firebase-functions');
const app = require('express')();
const main = require('express')();
const cors = require('cors');

const FBAuth = require('./utils/fbAuth');
const {
    db
} = require('./utils/admin');

// user routes
const {
    signup,
    getLocation,
    updateLocation,
    login,
    sendEmailVerification,
    getUserDetails,
    addUserDetails,
    updatePhone,
    verifyPhone
} = require('./routes/users');

// mini routes
const {
    councillor,
    mla,
    mp
} = require("./routes/ministers");

main.use(cors());
main.use('/v1', app)
exports.api = functions.https.onRequest(main);

// User routes
app.post('/signup', signup);
app.post('/location', updateLocation);
app.post('/getLocation', getLocation);
app.post('/login', login);
app.post('/user', getUserDetails);
app.post('/addUserDetails', addUserDetails);
app.post('/email', sendEmailVerification);
app.post('/phone', updatePhone);
app.post('/verifyPhone', verifyPhone);

// Mini Routes
app.post('/councillor', councillor);
app.post('/mla', mla);
app.post('/mp', mp);