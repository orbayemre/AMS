require('dotenv').config();
const Business = require('../models/businessModel');


class SearchController {
    static q = null;
    static page = 1;
    static perPage = 20;
    static type = null;
    static city = null;
    static district = null;

    
    static async setParamsObject(params){
        var query = {};

        if(params.page && params.page !== ""){
            SearchController.page = parseInt(params.page);
        }
        else{
            SearchController.page = 1;
        }

        if(params.perPage && params.perPage !== ""){
            SearchController.perPage = parseInt(params.perPage);
        }
        else{
            SearchController.perPage = 20;
        }

        if(params.q && params.q !== ""){
            SearchController.q = params.q;
            query.$or= [
                { name: { $regex: SearchController.q, $options: 'i' } },
                { long_name: { $regex: SearchController.q, $options: 'i' } },
            ];
        }
        else{
            SearchController.q = null;
        }

        if(params.type && params.type !== ""){
            SearchController.type = params.type;
            query.type = SearchController.type;
        }
        else{
            SearchController.type = null;
        }

        if(params.city && params.city !== ""){
            SearchController.city = params.city;
            query.city = SearchController.city;
        }
        else{
            SearchController.city = null;
        }

        if(params.district && params.district !== ""){
            SearchController.district = params.district;
            query.district = SearchController.district;
        }
        else{
            SearchController.district = null;
        }
        

        return query;

        
    } 
    
    static async searchBusiness(req, res) {

        try {
            const params = await SearchController.setParamsObject(req.query);
            var businesses = null
            if(SearchController.q){
                businesses = await Business.find(params).sort({popularity:-1})
                .skip((SearchController.page - 1) * SearchController.perPage)
                .limit(SearchController.perPage)
                .select('-password -createdAt -updatedAt -__v'); 
            }

            return res.status(200).json({ status: 'success', data:{ businesses: businesses } });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    static async getFilter(req, res){

        try {

            const { filterType } = req.query;

            if(filterType == "type"){
               const result = {
                    'filterType' : "type",
                    "data" : [
                        { "key" : "hairdresser" , "name" : "Hairdresser"},
                        { "key" : "beauty-salon" , "name" : "Beauty Salon"},
                        { "key" : "psychologist" , "name" : "Psychologist"},
                        { "key" : "dental-clinic" , "name" : "Dental Clinic"},
                        { "key" : "astroturf" , "name" : "Astroturf"},
                        { "key" : "auto-service" , "name" : "Automotive Service"},
                        { "key" : "massage-center" , "name" : "Massage Center"},
                        { "key" : "consultancy-service" , "name" : "Consultancy Service"},
                    ]
                }
                return res.status(200).json({ status: 'success', result: result  });
            }
            else if(filterType == "city"){
                const response = await fetch("https://turkiyeapi.dev/api/v1/provinces");
                const data = await response.json();
                var cities = [];
                data['data'].forEach(city => {
                    cities.push({'id' : city.id, 'name' : city.name});
                });
                
                const result = {
                    'filterType' : "city",
                    "data" : cities
                }
                return res.status(200).json({ status: 'success', result: result  });
            }
            else if(filterType == "district"){
                
                const { cityId } = req.query;
                if(!cityId){
                    return res.status(401).json({ message: 'cityId param not provided'  });
                }

                const response = await fetch("https://turkiyeapi.dev/api/v1/provinces");
                const data = await response.json();

                var districts = [];
                var cityName;
                data['data'].forEach(city => {
                    if (city.id ==  cityId){
                        cityName = city.name;
                        city['districts'].forEach(district => {
                            districts.push({'id' : district.id, 'name' : district.name});
                        });
                    }
                });
                
                const result = {
                    'filterType' : "district",
                    "city" : cityName,
                    "data" : districts
                }
                return res.status(200).json({ status: 'success', result: result  });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }


    }
 

}



module.exports = SearchController;