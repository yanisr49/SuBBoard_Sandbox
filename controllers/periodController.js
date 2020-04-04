const period = require('./period/lib.js');

module.exports = function (app) {
    app.post('/addPeriod',period.addPeriod);
    app.post('/delPeriod',period.delPeriod);
}