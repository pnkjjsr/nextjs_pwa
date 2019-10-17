const {
    admin,
    db
} = require('../../utils/admin');

exports.party = (req, res) => {
    const partyData = []
    let partyRef = db.collection('parties');
    partyRef.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                partyData.push(doc.data())
            });
            return res.json(partyData);
        })
        .catch(error => {
            return res.status(400).json(error)
        });
}

exports.addParty = (req, res) => {
    console.log(req);
    
    const partyData = {
        "founded": "01/01/2014",
        "fullName": "Aam Admi Party",
        "shortName": "AAp",
        "photoUrl": ""
    }
    console.log(partyData);

    let partyRef = db.collection('parties');
    partyRef.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                partyData.push(doc.data())
            });
            return res.json(partyData);
        })
        .catch(error => {
            return res.status(400).json(error)
        });
}