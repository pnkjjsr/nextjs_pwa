const {
    admin,
    db
} = require('../../utils/admin');
const {
    validateCouncillorData,
    validateAddCouncillorData
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
                    status: 'fail',
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

exports.addCouncillor = (req, res) => {
    const data = {
        "createdAt": new Date().toISOString(),
        "pincode": req.body.pincode,
        "constituency": req.body.constituency,
        "cases": req.body.cases,
        "education": req.body.education,
        "party": req.body.party,
        "address": req.body.address,
        "liabilities": req.body.liabilities,
        "state": req.body.state,
        "assets": req.body.assets,
        "name": req.body.name,
        "zone": req.body.zone,
        "age": req.body.age
    }

    const {
        valid,
        errors
    } = validateAddCouncillorData(data);
    if (!valid) return res.status(400).json(errors);

    let councillorRef = db.collection('councillors');
    let queryRef = councillorRef.where('pincode', '==', data.pincode)

    queryRef.get()
        .then(snapshot => {
            if (!snapshot.empty) {
                return res.status(400).json({
                    status: 'fail',
                    messsage: "This Constituency already had councillor."
                })
            } else {
                let newCouncillorRef = councillorRef.add(data).then(ref => {
                    console.log('Added document with ID: ', ref.id);
                    db.collection('councillors').doc(ref.id).update({
                        uid: ref.id
                    }).then(ref => {
                        return res.json({
                            status: 'done',
                            message: "Location update in user document"
                        });
                    })

                })
            }
        })
        .catch(error => {
            return res.status(400).json(error)
        });
}

exports.mla = (req, res) => {}

exports.mp = (req, res) => {}