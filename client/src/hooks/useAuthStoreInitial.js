
import Cookies from 'js-cookie';
import axios from 'axios';
import Params from "../params"

export default async function useAuthStoreInitial(){
    const token = Cookies.get('AMS_token');
    const userType = Cookies.get('user_type');
    var result = {
        isLogin: false,
        accessToken: "",
        userType:"",
        data:null,
    };
    if(token){
        if(userType == "business"){
            await axios.get(Params.api+"/api/business/my-business",{
                headers:{
                    "Authorization" : "Bearer " + token
                }
            })
            .then(({data})=>{
                if(data.business){
                    result = {
                        isLogin: true,
                        accessToken: token,
                        userType: userType,
                        data: data,
                    };
                }
                else{
                    result = {
                        isLogin: false,
                        accessToken: "",
                        userType:"",
                        data:null,
                    };
                }

            })
        }
        else if(userType == "user"){
            await axios.get(Params.api+"/api/user/me",{
                headers:{
                    "Authorization" : "Bearer " + token
                }
            })
            .then(({data})=>{
                if(data.user){
                    result = {
                        isLogin: true,
                        accessToken: token,
                        userType: userType,
                        data: data,
                    };
                }
                else{
                    result = {
                        isLogin: false,
                        accessToken: "",
                        userType:"",
                        data:null,
                    };
                }


            })

        }
    }

    if(!result.isLogin){
        Cookies.remove('AMS_token') ;
        Cookies.remove('user_type') ;
    }
    return result;
    
}