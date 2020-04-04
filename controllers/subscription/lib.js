const Subscription = require("../../schema/schemaSubscription.js");
const Period = require("../../schema/schemaPeriod.js");
const User = require("../../schema/schemaUser.js");


async function addSub(req, res) {

    const { email, name, note, webSiteLink, startDate, endDate, frequency, price, promotion } = req.body;

    if (!name || !price) {
        //Le cas où le nom ne serait pas soumit ou nul
        return res.status(400).json({
            text: "Requête invalide"
        });
    }

    // Création d'un objet period
    const period = {
        start : startDate,
        end : endDate,
        frequency,
        price,
        type : promotion
    };

    const subscription = {
        name,
        note,
        website_link : webSiteLink
    }

    try {
        // On check en base si le user à déjà un abonnement du meme nom
        const findUser = await User.findOne({ email });

        for (const sub of findUser.subscriptions) {
            const verifSub = await Subscription.findOne({ _id : sub });
            if (verifSub.name == name) {
                return res.status(400).json({
                    text: "Cet user possède déjà un abonnement de ce nom"
                });
            }
        }

        // Sauvegarde de l'abonnement et les périodes en base
        const subData = new Subscription(subscription);
        await subData.save();

        const periodData = new Period(period);
        await periodData.save();
        

        subData.periods.push(periodData)
        await subData.save();
        

        findUser.subscriptions.push(subData),
        await findUser.save();
        

        return res.status(200).json({
            text: "Succès"
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

async function getSubs(req, res) {

    const { email } = req.body;

    try {
        const findUser = await User.findOne({
            email
        });


        const subs = [];
        for (const sub of findUser.subscriptions) {
            const findSub = await Subscription.findById({_id: sub});

            var lastPeriod = null;
            for(const period of findSub.periods) {
                const findPeriod = await Period.findById({_id: period});
                if(lastPeriod == null) {
                    lastPeriod = 
                    {
                        id: findPeriod._id,
                        start: findPeriod.start,
                        end: findPeriod.end,
                        frequency: findPeriod.frequency,
                        price: findPeriod.price,
                        type: findPeriod.type
                    };
                } else if(findPeriod.end > lastPeriod.end) {
                    lastPeriod = 
                    {
                        id: findPeriod._id,
                        start: findPeriod.start,
                        end: findPeriod.end,
                        frequency: findPeriod.frequency,
                        price: findPeriod.price,
                        type: findPeriod.type
                    };
                }
                
            }
            subs.push(
                {
                    id: findSub._id,
                    name: findSub.name, 
                    note: findSub.note,
                    website_link: findSub.website_link,
                    logo_path: findSub.logo_path,
                    period: lastPeriod
                }
            );
        }
        
        return res.status(200).json({
            data: subs
        });

    } catch (error) {
        return res.status(500).json({ error });
    }
}

async function getSub(req, res) {

    const { email, name } = req.body;

    try {
        const findUser = await User.findOne({
            email
        });

        var bufferSub;
        const periods = [];
        var returnSub;
        for (const sub of findUser.subscriptions) {
            const findSub = await Subscription.findById({_id: sub});
            if (findSub.name == name){
                bufferSub = findSub;
                for(const period of bufferSub.periods) {
                    const findPeriod = await Period.findById({_id: period});
                    periods.push(
                        {
                            id: findPeriod._id,
                            start: findPeriod.start,
                            end: findPeriod.end,
                            frequency: findPeriod.frequency,
                            price: findPeriod.price,
                            type: findPeriod.type
                        }
                    );
                }
                returnSub = {
                    id: bufferSub._id,
                    name: bufferSub.name, 
                    note: bufferSub.note,
                    website_link: bufferSub.website_link,
                    logo_path: bufferSub.logo_path,
                    periods: periods
                }
            }
            
        }
        
        return res.status(200).json({
            data: returnSub
        });

    } catch (error) {
        return res.status(500).json({ error });
    }
}


async function delSub(req, res) {
    const { email, name } = req.body;
    try {
        var findUser = await User.findOne({
            email
        });

        var index = 0;
        for (const sub of findUser.subscriptions) {
            const findSub = await Subscription.findById({_id: sub});
            if (findSub.name == name){
                //delete period then sub
                for(const period of findSub.periods) {
                    Period.deleteOne({ _id: period }, function (err) {
                        if(err) console.log(err);
                        console.log("Successful deletion");
                      });
                }
                Subscription.deleteOne({ _id: findSub._id }, function (err) {
                    if(err) console.log(err);
                    console.log("Successful deletion");
                  });

                findUser.subscriptions.splice(index, 1)

                await findUser.save();
            }
            index = index + 1;
        }
        
        return res.status(200).json({
            text: "Successful deletion"
        });

    } catch (error) {
        return res.status(500).json({ error });
    }
}

//On exporte nos 4 fonctions
exports.addSub = addSub;
exports.getSubs = getSubs;
exports.getSub = getSub;
exports.delSub = delSub;