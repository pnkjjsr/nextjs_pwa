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

// ministers routes
const {
    councillor,
    addCouncillor,
    mla,
    addMla,
    mp,
    addMp,
    minister
} = require("./routes/ministers");

// party routes
const {
    party,
    addParty
} = require("./routes/parties");

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

// Ministers Routes
app.post('/councillor', councillor);
app.post('/add-councillor', addCouncillor);
app.post('/mla', mla);
app.post('/addMla', addMla);
app.post('/mp', mp);
app.post('/addMp', addMp);
app.post('/minister', minister)

// Party
app.post('/party', party);
app.post('/add-party', addParty);