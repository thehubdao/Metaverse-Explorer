import React, { useState } from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

interface DarkModeButtonProps {
    setSwitchState?: Function
    switchState?: boolean
}


function DarkModeButton({ setSwitchState, switchState }: DarkModeButtonProps) {

  const changeState = (event: any) => {
    setSwitchState(!switchState)
  }


  const DarkModeSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" 
    disableRipple {...props} 
    // checked={switchState} 
    // onChange={changeState} 
    />
  ))(({ theme }) => ({
    width: 104,
    height: 48,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(56px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#34373D' : '#D4DBE7',
          opacity: 1,
          
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 43,
      height: 43,
    },
    '& .MuiSwitch-track': {
      borderRadius: 48 / 2,
      border: '1px solid #fff',
      backgroundColor: theme.palette.mode === 'light' ? '#34373D' : '#D4DBE7',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));
  
  return (
    <div className='flex flex-col mx-8 mt-4 items-center justify-center cursor-pointer p-2 w-16 h-16 group focus:outline-none'>
        <FormGroup>
          <FormControlLabel
            control={<DarkModeSwitch sx={{ m: 1 }}  />}
            label=""
          />
        </FormGroup>
    </div>
  );
}

export default DarkModeButton;