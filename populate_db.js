const User = require("./schema/schemaUser.js");
const Sub = require("./schema/schemaSubscription.js");
const Period = require("./schema/schemaPeriod.js");
const passwordHash = require("password-hash");

module.exports = async function () {
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
        
    const subData1 = new  Sub(
        {
            name: "Netflix",
        }
    );
        
    const subData2 = new  Sub(
        {
            name: "Amazon Prime",
        }
    );
        
    const periodData1 = new  Period(
        {
            start: new Date(),
            end: (new Date()).setMonth(05),
            frequency: 'daily',
            price: '10.99',
            type: false
        }
    );
        
    const periodData2 = new  Period(
        {
            start: new Date(),
            end: new Date(),
            frequency: 'daily',
            price: '11.99',
            type: true
        }
    );
        
    const periodData3 = new  Period(
        {
            start: new Date(),
            end: new Date(),
            frequency: 'daily',
            price: '12.99',
            type: false
        }
    );
    
    await periodData1.save();
    await periodData2.save();
    await periodData3.save();
    subData1.periods.push(periodData1);
    subData1.periods.push(periodData2);
    subData2.periods.push(periodData3);
    await subData1.save();
    await subData2.save();
    userData.subscriptions.push(subData1);
    userData.subscriptions.push(subData2);
    await userData.save();
    /*
    subData.save(function(err) {
        userData.subscriptions.push(subData);
        userData.subscriptions.push(subData);
        userData.save();
        .then((data) => {
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
    });*/

}
//:)