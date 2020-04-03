const Subscription = require("../../schema/schemaSubscription.js");
const Period = require("../../schema/schemaPeriod.js");
const User = require("../../schema/schemaUser.js");


async function addSub(req, res) {

    const { email, name, note, webSiteLink, startDate, endDate, frequency, price, promotion, startPromotion, endPromotion, promotionPrice} = req.body;

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
        type : false
    };
    var periodPromotion
    if (promotion == true){
        periodPromotion = {
            start : startPromotion,
            end : endPromotion,
            price : promotionPrice,
            type : promotion
        };
    }

    const subscription = {
        name,
        note,
        website_link : webSiteLink
    }
    


    // On check en base si l'abonnement existe déjà
    try {
        const findSub = await Subscription.findOne({
            name
        });
        if (findSub) {
            return res.status(400).json({
                text: "L'abonnement existe déjà"
            });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }

    try {
        // Sauvegarde de l'abonnement et les périodes en base
        const subData = new Subscription(subscription);
        await subData.save();

        if (promotion == true){
        
            // ajoute aussi la période promotion
            const periodPromData = new Period(periodPromotion);
            await periodPromData.save();
            subData.periods.push(periodPromData)
        }

        const periodData = new Period(period);
        await periodData.save();
        

        subData.periods.push(periodData)
        await subData.save();
        

        const findUser = await User.findOne({ email });

        findUser.subscriptions.push(subData)
        

        return res.status(200).json({
            text: "Succès"
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

async function getSubs(req, res) {

    const { email } = req.body;

    // On check en base si l'abonnement existe déjà
    try {
        const findUser = await User.findOne({
            email
        });


        const subs = [];
        for (const sub of findUser.subscriptions) {
            const findSub = await Subscription.findById({_id: sub});

            const periods = [];
            for(const period of findSub.periods) {
                const findPeriod = await Period.findById({_id: period});
                periods.push(
                    {
                        start: findPeriod.start,
                        end: findPeriod.end,
                        frequency: findPeriod.frequency,
                        price: findPeriod.price,
                        type: findPeriod.type
                    }
                );
            }
            subs.push(
                {
                    name: findSub.name, 
                    note: findSub.note,
                    website_link: findSub.website_link,
                    logo_path: findSub.logo_path,
                    periods: periods
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



//On exporte nos deux fonctions
exports.addSub = addSub;
exports.getSubs = getSubs;