const subscription = require('./subscription/lib.js');

module.exports = function (app) {
    app.post('/add',subscription.addSub);
    app.post('/getAll',subscription.getSubs);
    app.post('/get',subscription.getSub);
    app.post('/del',subscription.delSub);
}