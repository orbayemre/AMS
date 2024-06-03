
import Cookies from 'js-cookie';
import axios from 'axios';
import Params from "../params"

export default async function useIsLogged(){
    const token = Cookies.get('AMS_token');
    const userType = Cookies.get('user_type');
    var result = false;
    if(token){
        if(userType == "business"){
            await axios.get(Params.api+"/api/business/my-business",{
                headers:{
                    "Authorization" : "Bearer " + token
                }
            })
            .then(({data})=>{
                if(data.business){
                    result = true;
                }
                else{
                    result = false;
                }

            })
        }
        else{
            await axios.get(Params.api+"/api/user/me",{
                headers:{
                    "Authorization" : "Bearer " + token
                }
            })
            .then(({data})=>{
                if(data.user){
                    result = true;
                }
                else{
                    result = false;
                }


            })

        }
    }

    if(result){
        return true;
    }
    else{
        Cookies.remove('AMS_token') ;
        Cookies.remove('user_type') ;
        return false;
    }
    
}