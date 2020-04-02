const User = require("./schema/schemaUser.js");
const Sub = require("./schema/schemaSubscription.js");
const passwordHash = require("password-hash");

module.exports = function () {
    const userData = new User(
        {
            email: "a@a.a",
            lname: "a",
            fname: "b",
            birthdate: new Date('1997-01-01'),
            gender: "Man",
            password: passwordHash.generate("a")
        }
    );
    userData.save();
        
    const subData = new  Sub(
        {
            name: "Netflix",
        }
    );
    subData.save(function(err) {
        userData.subscriptions.push(subData);
        userData.subscriptions.push(subData);
        userData.save().then((data) => {
            Sub.deleteOne({ name: 'Netflix' }, function (err) {
                if(err) console.log(err);
                console.log("Successful deletion");
              });
            console.log(data);
        }).then(() => {
            User.findByIdAndUpdate(userData._id, {lname:"test"}, function(err) {
                if(err) console.log(err);
            });
        });
    });
}
//:)