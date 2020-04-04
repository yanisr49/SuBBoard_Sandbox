const period = require('./period/lib.js');

module.exports = function (app) {
    app.post('/add',period.addPeriod);
    app.post('/del',period.delPeriod);
}