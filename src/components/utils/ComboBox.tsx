import React from 'react';

import Select  from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

import type { ComboBoxItem } from 'types/ComboBoxItem';

type Props = {
  inputLabel: string
  items: ComboBoxItem[]
  value: string
  onChange: (selected: string) => void
}

const ComboBox: React.FC<Props> = (props) => {
  const{ inputLabel, items, value, onChange } = props;
 

  return (
    <FormControl fullWidth>
      <InputLabel id="section-label">{inputLabel}</InputLabel>
      <Select
        labelId="section-label"
        label={inputLabel}
        required
        value = {value}
        onChange={(e) =>{
          if (e.target.value !== 'undefined'){
            onChange(e.target.value);
          }
        }}
      >
        {items.map((item) =>(
          <MenuItem value={item.id} key={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
};

export default ComboBox;
