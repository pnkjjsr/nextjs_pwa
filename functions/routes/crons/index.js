const fs = require('fs');
const readline = require('readline');
const {
    google
} = require('googleapis');

const {
    googleSheet
} =
require('../../utils/sheet');

const {
    admin,
    db
} = require('../../utils/admin');



exports.addMinisters = (req, res) => {
    googleSheet('1sgh4yVQ2gEIKmMBFuSq-eUDt4MFV0tklnz322-d_G3s').then(response => {
        return res.json(response)
    });
    // let partyRef = db.collection('parties');
}