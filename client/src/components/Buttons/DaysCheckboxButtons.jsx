import { useTranslation } from "react-i18next"
import '../../styles/auth.css';
import '../../styles/common.css';

export default function DaysCheckboxButtons({title, days={},onChange}){
 
    const {t} = useTranslation();

    return(
        <div>
            <div className='radio-tile-head font-josefin-500'>
                {title}:
            </div>
            <div className="radio-tile-group">
                <div className="input-container">
                    <input id="monday" className="radio-button" type="checkbox" name="monday" value="monday" checked={days["monday"]}  onChange={() => onChange("monday")}/>
                    <div className="radio-tile" >
                        <label htmlFor="monday" className="radio-tile-label font-josefin-700">{t('monday')}</label>
                    </div>
                </div>

                <div className="input-container">
                    <input id="tuesday" className="radio-button" type="checkbox" name="tuesday" value="tuesday" checked={days["tuesday"]} onChange={() => onChange("tuesday")} />
                    <div className="radio-tile">
                        <label htmlFor="tuesday" className="radio-tile-label  font-josefin-700">{t('tuesday')}</label>
                    </div>
                </div>

                <div className="input-container">
                    <input id="wednesday" className="radio-button" type="checkbox" name="wednesday" value="wednesday" checked={days["wednesday"]} onChange={() => onChange("wednesday")} />
                    <div className="radio-tile">
                        <label htmlFor="wednesday" className="radio-tile-label font-josefin-700">{t('wednesday')}</label>
                    </div>
                </div>

                <div className="input-container">
                    <input id="thursday" className="radio-button" type="checkbox" name="thursday" value="thursday" checked={days["thursday"]} onChange={() => onChange("thursday")} />
                    <div className="radio-tile">
                        <label htmlFor="thursday" className="radio-tile-label font-josefin-700">{t('thursday')}</label>
                    </div>
                </div>

                <div className="input-container">
                    <input id="friday" className="radio-button" type="checkbox" name="friday" value="friday" checked={days["friday"]} onChange={() => onChange("friday")} />
                    <div className="radio-tile">
                        <label htmlFor="friday" className="radio-tile-label font-josefin-700">{t('friday')}</label>
                    </div>
                </div>

                <div className="input-container">
                    <input id="saturday" className="radio-button" type="checkbox" name="saturday" value="saturday" checked={days["saturday"]} onChange={() => onChange("saturday")} />
                    <div className="radio-tile">
                        <label htmlFor="saturday" className="radio-tile-label font-josefin-700">{t('saturday')}</label>
                    </div>
                </div>

                <div className="input-container" >
                    <input id="sunday" className="radio-button" type="checkbox" name="sunday" value="sunday" checked={days["sunday"]} onChange={() => onChange("sunday")} />
                    <div className="radio-tile">
                        <label htmlFor="sunday" className="radio-tile-label font-josefin-700">{t('sunday')}</label>
                    </div>
                </div>
            </div>
        </div>

    )
}