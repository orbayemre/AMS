import { useTranslation } from "react-i18next"
import '../../styles/auth.css';
import '../../styles/common.css';

export default function DaysCheckboxButtons({title, days={},onChange}){
 
    const {t} = useTranslation();

    return(
        <div>
            <div className='radio-tile-head font-josefin-500'>
                {title}
            </div>
            <div className="radio-tile-group">
                <div className="input-container" onClick={() => onChange("monday")}>
                    <input id="monday" className="radio-button" type="checkbox" name="monday" value="monday" checked={days["monday"]} readOnly/>
                    <div className="radio-tile">
                        <label className="radio-tile-label font-josefin-700">{t('Monday')}</label>
                    </div>
                </div>

                <div className="input-container" onClick={() => onChange("tuesday")}>
                    <input id="tuesday" className="radio-button" type="checkbox" name="tuesday" value="tuesday" checked={days["tuesday"]} readOnly/>
                    <div className="radio-tile">
                        <label className="radio-tile-label  font-josefin-700">{t('Tuesday')}</label>
                    </div>
                </div>

                <div className="input-container" onClick={() => onChange("wednesday")}>
                    <input id="wednesday" className="radio-button" type="checkbox" name="wednesday" value="wednesday" checked={days["wednesday"]} readOnly/>
                    <div className="radio-tile">
                        <label className="radio-tile-label font-josefin-700">{t('Wednesday')}</label>
                    </div>
                </div>

                <div className="input-container" onClick={() => onChange("thursday")}>
                    <input id="thursday" className="radio-button" type="checkbox" name="thursday" value="thursday" checked={days["thursday"]} readOnly/>
                    <div className="radio-tile">
                        <label className="radio-tile-label font-josefin-700">{t('Thursday')}</label>
                    </div>
                </div>

                <div className="input-container" onClick={() => onChange("friday")}>
                    <input id="friday" className="radio-button" type="checkbox" name="friday" value="friday" checked={days["friday"]} readOnly/>
                    <div className="radio-tile">
                        <label className="radio-tile-label font-josefin-700">{t('Friday')}</label>
                    </div>
                </div>

                <div className="input-container" onClick={() => onChange("saturday")}>
                    <input id="saturday" className="radio-button" type="checkbox" name="saturday" value="saturday" checked={days["saturday"]} readOnly/>
                    <div className="radio-tile">
                        <label className="radio-tile-label font-josefin-700">{t('Saturday')}</label>
                    </div>
                </div>

                <div className="input-container"  onClick={() => onChange("sunday")}>
                    <input id="sunday" className="radio-button" type="checkbox" name="sunday" value="sunday" checked={days["sunday"]} readOnly/>
                    <div className="radio-tile">
                        <label className="radio-tile-label font-josefin-700">{t('Sunday')}</label>
                    </div>
                </div>
            </div>
        </div>

    )
}