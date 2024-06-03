import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MultipleSelect(props) {
    const {
        className,
        optionArr,
        handleOnChange,
        labelTitle,
        width
    } = props;
    return (
        <Autocomplete
            multiple
            className={className}
            id="checkboxes-tags-demo"
            size='small'
            options={optionArr}
            disableCloseOnSelect
            onChange={handleOnChange}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.name}
                </li>
            )}
            sx={{ width: width ? width : '100%', padding: '0', border: '0', borderRadius: '5px' }}
            renderInput={(params) => (
                <TextField {...params} label={labelTitle ? labelTitle : "Service Type"} placeholder="Service Type" />
            )}
        />
    );
}