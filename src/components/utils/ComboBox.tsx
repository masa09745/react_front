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
  const{ inputLabel, items, defaultValue, value, onChange } = props;

  return (
    <FormControl>
      <InputLabel>{inputLabel}</InputLabel>
      <Select
        defaultValue={defaultValue}
        value={value}
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
