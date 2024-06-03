
const Business = require('../models/businessModel');

class Popularity {
    static updateFactors = {
        "forMake" : 1.1234,
        "forApprove" : 1.0454,
        "forReject" : 0.9834,
        "forClose" : 0.9902,
        "forSpecial" : 0.9634,
    };

    static async updatePopularity(businessId,type){

        try {
            const business = await Business.findById(businessId);
            const newPopularity = ( business.popularity * Popularity.updateFactors[type])
            business.popularity = newPopularity;
            business.save();
            return newPopularity;
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}



module.exports = Popularity;