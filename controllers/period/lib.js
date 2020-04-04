const Subscription = require("../../schema/schemaSubscription.js");
const Period = require("../../schema/schemaPeriod.js");

async function addPeriod(req, res) {

    const { idSub, start, end, price, frequency, isPromotion } = req.body;

    try {

        // Création d'un objet period
        const period = {
            start,
            end,
            frequency,
            price,
            type : isPromotion
        };

        const periodData = new Period(period);
        await periodData.save();

        const findSub = await Subscription.findById({_id: idSub});

        findSub.periods.push(periodData);
        await findSub.save();

        return res.status(200).json({
            text: "Succès"
        });

    } catch (error) {
        return res.status(500).json({ error });
    }
}


async function delPeriod(req, res) {
    const { idSub, idPeriod } = req.body;
    try {

        Period.deleteOne({ _id: idPeriod }, function (err) {
            if(err) console.log(err);
            console.log("Successful deletion");
          });
          
        const findSub = await Subscription.findById({_id: idSub});

        
        var index = 0;
        for (const period of findSub.periods) {
            if (period == idPeriod){
                findSub.periods.splice(index, 1)
                await findSub.save();
            }
            index = index + 1
        }
        
        return res.status(200).json({
            text: "Successful deletion"
        });

    } catch (error) {
        return res.status(500).json({ error });
    }
}

//On exporte nos deux fonctions
exports.addPeriod = addPeriod;
exports.delPeriod = delPeriod;