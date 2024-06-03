import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function SwitchButton({label, checked, onChange}){

    return (
        <FormGroup>
          <FormControlLabel control={<Switch checked={checked} onChange={onChange} />} label={label} className='switchButton'/>
        </FormGroup>
      );
}