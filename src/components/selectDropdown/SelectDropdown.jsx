import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const SelectDropdown = (props) => {
    const {
        className,
        optionArr,
        handleOnChange,
        labelTitle
    } = props;
   
    return (
        <div>
            <Autocomplete
                className={className}
                disablePortal
                size='small'
                id="combo-box-demo"
                options={optionArr}
                onChange={handleOnChange}
                sx={{ width: '100%', padding: '0', border: '0', borderRadius: '5px' }}
                renderInput={(params) => <TextField {...params} label={labelTitle ? labelTitle : "Select one"}/>}
            />
        </div>
    )
}
