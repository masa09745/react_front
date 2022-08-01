import React from 'react';

import Select  from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

import type { ComboBoxItem } from 'types/ComboBoxItem';

type Props = {
  inputLabel: string
  items: ComboBoxItem[]
  defaultValue: string
  value: string
  onChange: (selected: string) => void
}

const ComboBox: React.FC<Props> = (props) => {
  const{ inputLabel, items, value, onChange } = props;

  return (
    <FormControl fullWidth>
      <InputLabel id="section-label">{inputLabel}</InputLabel>
      <Select
        value={value}
        labelId="section-label"
        label={inputLabel}
        required
        onChange={(e)=>{
          if(e.target.value !== 'undefined') {
            onChange(e.target.value as string);
          }
        }}
      >
        {items.map((item) =>(
          <MenuItem value={item.value} key={item.value}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
};

export default ComboBox;
