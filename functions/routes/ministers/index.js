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
        'constituency': req.body.constituency
    }

    // const {
    //     valid,
    //     errors
    // } = validateCouncillorData(data);
    // if (!valid) return res.status(400).json(errors);

    let councillorRef = db.collection('councillors');
    let queryRef = councillorRef.where('constituency', '==', data.constituency)

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
        "partyShort": req.body.partyShort,
        "address": req.body.address,
        "liabilities": req.body.liabilities,
        "area": req.body.area,
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
    let queryRef = councillorRef.where('constituency', '==', data.constituency)

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

exports.mla = (req, res) => {
    const data = {
        'constituency': req.body.constituency
    }

    // const {
    //     valid,
    //     errors
    // } = validateCouncillorData(data);
    // if (!valid) return res.status(400).json(errors);

    let mlaRef = db.collection('mlas');
    let queryRef = mlaRef.where('constituency', '==', data.constituency)

    queryRef.get()
        .then(snapshot => {
            if (snapshot.empty) {
                return res.status(400).json({
                    status: 'fail',
                    messsage: "No matching documents."
                })
            }
            snapshot.forEach(doc => {
                let mlaData = doc.data()
                return res.json(mlaData);
            });
        })
        .catch(error => {
            return res.status(400).json(error)
        });
}
exports.addMla = (req, res) => {
    const mlaData = {
        "createdAt": new Date().toISOString(),
        "pincode": req.body.pincode,
        "constituency": req.body.constituency,
        "cases": req.body.cases,
        "education": req.body.education,
        "party": req.body.party,
        "partyShort": req.body.partyShort,
        "address": req.body.address,
        "liabilities": req.body.liabilities,
        "area": req.body.area,
        "state": req.body.state,
        "assets": req.body.assets,
        "name": req.body.name,
        "zone": req.body.zone,
        "age": req.body.age
    }

    // const {
    //     valid,
    //     errors
    // } = validateAddCouncillorData(data);
    // if (!valid) return res.status(400).json(errors);

    let mlaRef = db.collection('mlas');
    let queryRef = mlaRef.where('constituency', '==', mlaData.constituency)

    queryRef.get()
        .then(snapshot => {
            if (!snapshot.empty) {
                return res.status(400).json({
                    status: 'fail',
                    messsage: "This Constituency already had mla."
                })
            } else {
                let newMlaRef = mlaRef.add(mlaData).then(ref => {
                    console.log('Added document with ID: ', ref.id);
                    db.collection('mlas').doc(ref.id).update({
                        uid: ref.id
                    }).then(ref => {
                        return res.json({
                            status: 'done',
                            message: "MLA update."
                        });
                    })

                })
            }
        })
        .catch(error => {
            console.log(error);

            return res.status(400).json(error)
        });
}


exports.mp = (req, res) => {
    const data = {
        'constituency': req.body.constituency
    }

    // const {
    //     valid,
    //     errors
    // } = validateCouncillorData(data);
    // if (!valid) return res.status(400).json(errors);

    let mpRef = db.collection('mps');
    let queryRef = mpRef.where('constituency', '==', data.constituency)

    queryRef.get()
        .then(snapshot => {
            if (snapshot.empty) {
                return res.status(400).json({
                    status: 'fail',
                    messsage: "No matching zone."
                })
            }
            snapshot.forEach(doc => {
                let mpData = doc.data()
                return res.json(mpData);
            });
        })
        .catch(error => {
            return res.status(400).json(error)
        });
}
exports.addMp = (req, res) => {
    const mpData = {
        "createdAt": new Date().toISOString(),
        "pincode": req.body.pincode,
        "constituency": req.body.constituency,
        "cases": req.body.cases,
        "education": req.body.education,
        "party": req.body.party,
        "partyShort": req.body.partyShort,
        "address": req.body.address,
        "liabilities": req.body.liabilities,
        "area": req.body.area,
        "state": req.body.state,
        "assets": req.body.assets,
        "name": req.body.name,
        "zone": req.body.zone,
        "age": req.body.age
    }

    // const {
    //     valid,
    //     errors
    // } = validateAddCouncillorData(data);
    // if (!valid) return res.status(400).json(errors);

    let mpRef = db.collection('mps');
    let queryRef = mpRef.where('constituency', '==', mpData.constituency)

    queryRef.get()
        .then(snapshot => {
            if (!snapshot.empty) {
                return res.status(400).json({
                    status: 'fail',
                    messsage: "This Constituency already has mp."
                })
            } else {
                let newMpRef = mpRef.add(mpData).then(ref => {
                    console.log('Added document with ID: ', ref.id);
                    db.collection('mps').doc(ref.id).update({
                        uid: ref.id
                    }).then(ref => {
                        return res.json({
                            status: 'done',
                            message: "MP update."
                        });
                    })

                })
            }
        })
        .catch(error => {
            console.log(error);

            return res.status(400).json(error)
        });
}