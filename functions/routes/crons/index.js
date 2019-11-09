const ChildProcess = require("child_process");
const MinisterCron = ChildProcess.fork("./childProcess/minister.js");
const { googleSheet } = require("../../utils/sheet");

const { admin, db } = require("../../utils/admin");

exports.cronCouncillors = (req, res) => {
  const type = req.body.type;
  googleSheet("1sgh4yVQ2gEIKmMBFuSq-eUDt4MFV0tklnz322-d_G3s", type).then(
    response => {
      return res.json(response);
    }
  );
  // let partyRef = db.collection('parties');
};
exports.cronMlas = (req, res) => {
  const type = req.body.type;
  MinisterCron.send(type);
  return res.json("Cron run successfully.");
};
exports.cronMps = (req, res) => {
  const type = req.body.type;
  MinisterCron.send(type);
  return res.json("Cron run successfully.");
};
