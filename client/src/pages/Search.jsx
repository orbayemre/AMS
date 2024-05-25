import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { ToastContainer } from "react-toastify";
import { CitySelect, StateSelect, GetState, GetCity } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

import Params from "../params";
import SearchInput from "../components/Inputs/SearchInput";
import SearchResults from "../components/Others/SearchResults";
import '../styles/common.css';
import '../styles/search.css';
import FilterTypeButtons from "../components/Buttons/FilterTypeButtons";


export default function Search(){

    const {t} = useTranslation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [q,setQ] = useState(searchParams.get('q'));
    const [type,setType] = useState(searchParams.get('type'));
    const [city,setCity] = useState(searchParams.get('city'));
    const [district,setDistrict] = useState(searchParams.get('district'));
    const [loading,setLoading] = useState(true);
    const [searchResults,setSearchResults] = useState(null)
    const [page,setPage] = useState(1);
    const [hasMore,setHasMore] = useState(true);
    const [scrollLoading,setScrollLoading] = useState(false);
    const [stateid, setstateid] = useState(0);
    const [districtid, setdistrictid] = useState(0);
    const [stateList, setStateList] = useState([]);
  
    const handleQ = (e) => {
        setQ(e.target.value)
    }
    const handleSubmit = async () =>{
        const queryParams = await setQueryParams();
        navigate("/search" + queryParams);
        navigate(0);
    }
    const handleApply = async () =>{
        const queryParams = await setQueryParams();
        navigate("/search" + queryParams);
        navigate(0);
    }

    const setQueryParams = async (withPage=false) =>{
        var queryParams = [];
        if(q && q != ""){
            queryParams.push('q=' + q)
        }
        if(type && type != ""){
            queryParams.push('type=' + type)
        }
        if(city && city != ""){
            queryParams.push('city=' + city)
        }
        if(district && district != ""){
            queryParams.push('district=' + district)
        }
        if(withPage){
            if(page){
                queryParams.push('page=' + (page+1))
                setPage(page+1)
            }
        }

        var result = "?" + (queryParams.join("&"))

        return encodeURI(result);
    } 

    const getData = async () =>{
        
        const query = await setQueryParams();
        await axios.get(Params.api+"/api/search/business"+query)
        .then(({data})=>{
            if(data.status == "success"){
                setSearchResults(data.data.businesses)
                if(data.data.businesses.length == 0){
                    setHasMore(false)
                }
            }else{
                console.log(data.message)
            }
        })
        .catch(function (error) {
            console.log(error.response.data.message);

        });
        
    }
    const getMoreData = async () =>{
        //page sayısı setQueryParams içinde artırılıyor.
        const query = await setQueryParams(true);

        await axios.get(Params.api+"/api/search/business"+query)
        .then(({data})=>{
            if(data.status == "success"){
                if(data.data.businesses){
                    if(data.data.businesses.length == 0){
                        setHasMore(false)
                    }else{
                        setSearchResults((prev) => [...prev, ...data.data.businesses]);
                    }

                }
            }else{
                console.log(data.message)
            }
        })
        .catch(function (error) {
            console.log(error.response.data.message);
        });

    }
    
    const  removeTurkishChars = (str) => {
        const turkishChars = 'ğıİıöÖşŞüÜçÇ';
        const turkishCharsLower = turkishChars.toLocaleLowerCase();
        const turkishCharsUpper = turkishChars.toLocaleUpperCase();
    
        let result = '';
        for (let i = 0; i < str.length; i++) {
            const char = str.charAt(i);
            if (!turkishCharsLower.includes(char) && !turkishCharsUpper.includes(char)) {
                result += char;
            }
        }
    
        return result;
    }
    

    useEffect(()=>{
        getData();

        GetState(225).then((result) => {
            setStateList(result);
            if(city){
                result.map(state =>{
                    var c1 = removeTurkishChars(city).toLowerCase();
                    var c2 = removeTurkishChars(state.name).toLowerCase();

                    if (c1 == c2) {
                        setstateid(state.id)
                        setTimeout(() => {
                            document.querySelector('.stdropdown-input input').value = state.name
                        }, 200);

                        if(district){

                            GetCity(225,state.id).then((result) => {
                                if(district){
                                    result.map(dist =>{
                                        var d1 = removeTurkishChars(district).toLowerCase();
                                        var d2 = removeTurkishChars(dist.name).toLowerCase();
                    
                                        if (d1 == d2) {
                                            setTimeout(() => {
                                                document.querySelectorAll('.stdropdown-input input')[1].value = dist.name
                                            }, 200);
                                        }
                                    })
                    
                                }
                            })
                        }
                    }
                })

            }
        })
    },[])

    useEffect(()=>{
        if(searchResults){
            console.log(searchResults)
            setLoading(false)
        }
    },[searchResults])
    
    useEffect(() => {
        setTimeout(() => {
            if(city){
                document.querySelector('.stdropdown-input input').value = city.charAt(0).toUpperCase() + city.slice(1)
            }
        }, 100);
        setTimeout(() => {
            if(district){
                document.querySelectorAll('.stdropdown-input input')[1].value = district.charAt(0).toUpperCase() + district.slice(1)
            }
        }, 100);
        
       
  
    });
    

    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }
    else{
        return(
            <div className="container searchContainer">

                <div className="searchBody">
                    <div className="filters font-josefin-500">
                        <h3>{t('Filters')}</h3>
                        <div className="filter filterType">
                            <FilterTypeButtons title={t('Type')} value={type} onChange={(val) => setType(val)}/>
                        </div>
                        <div className="filter filterCity">
                            <h4>{t('City')}:</h4>
                            <StateSelect
                                countryid={225}
                                onChange={(e) => {
                                    setCity(e.name);
                                    setstateid(e.id);
                                }}
                                placeHolder={t('select city')}
                            />
                        </div>
                        <div className="filter filterDistrict">
                            
                            <h4>{t('District')}:</h4>
                            <CitySelect
                                countryid={225}
                                stateid={stateid}
                                onChange={(e) => {
                                    setDistrict(e.name);
                                    setdistrictid(e.id);
                                }}
                                placeHolder={ stateid != 0 ? t('select district') :  t('Please select city first')}
                            />
                        </div>
                        <div className="apply" onClick={handleApply}>
                            {t('Apply Filters')}
                        </div>
                    </div>
                    <div className="resultsBody font-josefin-500">
                        <div className="searchInputCont">
                            <SearchInput value={q ? q : ""} placeholder={t('Search for business')} onChange={handleQ} submit={handleSubmit}/>
                        </div>
                        
                        {searchResults?.length !== 0  && !scrollLoading && 
                            <InfiniteScroll
                                dataLength={searchResults?.length}
                                next={getMoreData}
                                hasMore={hasMore}
                                //loader={<div>Loading...</div>}
                            >
                                <SearchResults results={searchResults} />
                            </InfiniteScroll>
                        }
                        {searchResults?.length === 0 && !scrollLoading && 
                            <div>
                                No results found.
                            </div>
                        }
                    </div>
                    
                </div>
                <ToastContainer/>
            </div>
        )
    }
}