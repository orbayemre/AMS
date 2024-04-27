import { CitySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useState } from "react";
import { useTranslation } from "react-i18next"

export default function AddressSelection({setCity,setDistrict}) {

    const {t} = useTranslation();
    const [stateid, setstateid] = useState(0);

    return (
      <div className="address-selection font-josefin-500">
        <div className="citySelect">
            <span>{t('city')+"*"}:</span>
            <StateSelect
            countryid={225}
            onChange={(e) => {
                setCity(e.name);
                setstateid(e.id);
            }}
            placeHolder={t('select city')}
            />

        </div>
        <div className="districtSelect">
            <span>{t('district')+"*"}:</span>
            <CitySelect
            countryid={225}
            stateid={stateid}
            onChange={(e) => {
                setDistrict(e.name);
            }}
            placeHolder={t('select district')}
            />
        </div>
      </div>
    );
}