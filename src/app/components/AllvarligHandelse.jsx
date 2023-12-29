import React, { useState } from 'react';
import { Button } from '@mui/material';

const AllvarligHandelse = () => {
  const initialState = [
    { text: 'Ja', id: '1', variant: 'outlined' },
    { text: 'Nej', id: '2', variant: 'outlined' }
  ];

  const [buttons, setButtons] = useState(initialState);

  const handleClick = id => {
    setButtons(buttons.map(button => ({
      ...button,
      variant: button.id === id ? 'contained' : 'outlined'
    })));
  };

  return (
    <div className='container'>
      <div className='labels'>
        <label>Misstänkt allvarlig händelse:</label>
      </div>
      <div className='input-tab'>
        {buttons.map(button => (
          <Button
            key={`AllvarligHandelse${button.id}`}
            sx={{ m: 0.5 }}
            id={`AllvarligHandelse${button.id}`}
            type='button'
            variant={button.variant}
            onClick={() => handleClick(button.id)}
          >
            {button.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AllvarligHandelse;