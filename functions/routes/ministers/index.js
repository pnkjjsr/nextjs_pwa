const {
    admin,
    db
} = require('../../utils/admin');
const {
    validateCouncillorData
} = require('./validators');

exports.councillor = (req, res) => {
    const data = {
        'pincode': req.body.pincode
    }

    const {
        valid,
        errors
    } = validateCouncillorData(data);
    if (!valid) return res.status(400).json(errors);

    let councillorRef = db.collection('councillors');
    let queryRef = councillorRef.where('pincode', '==', data.pincode)

    queryRef.get()
        .then(snapshot => {
            if (snapshot.empty) {
                return res.status(400).json({
                    status: 'failed',
                    messsage: "No matching documents."
                })
                return;
            }
            snapshot.forEach(doc => {
                let councillorData = doc.data()
                return res.json(councillorData);
            });
        })
        .catch(error => {
            return res.status(400).json(error)
        });
}

exports.mla = (req, res) => {}

exports.mp = (req, res) => {}