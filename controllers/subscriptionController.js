const subscription = require('./subscription/lib.js');

module.exports = function (app) {
    app.post('/add',subscription.addSub);
    app.post('/get',subscription.getSubs);
}