/**
 * Importing required components and hooks from libraries
 */
import { Button } from '@mui/material';
import React, { useState } from 'react';
import Methane from '../classes/Methane';

/**
 * Interface for the Button properties
 */
interface ButtonProps {
  text: string;
  id: string;
  variant: "outlined" | "text" | "contained";
}

/**
 * Array of button labels
 */
const buttonLabels = ["Ja", "Nej"];

/**
 * Initial state of the buttons
 */
const initialButtons: ButtonProps[] = buttonLabels.map((text, index) => ({
  text,
  id: (index + 1).toString(),
  variant: 'outlined',
}));

/**
 * MajorIncidentComponent is a functional component that receives methane and onChange as props
 */
const MajorIncidentComponent: React.FC<{ methane: Methane, onChange: (value: Methane) => void }> = ({ methane, onChange }) => {
  const [buttons, setButtons] = useState(() => {
    if (methane.major_incident!==undefined) {
        if (methane.major_incident===true) {
          initialButtons[0].variant = 'contained';
          initialButtons[1].variant = 'outlined';
        } else {
          initialButtons[0].variant = 'outlined';
          initialButtons[1].variant = 'contained';
        }
    }
    return initialButtons;
  });

  /**
   * Function to handle button click events
   */
  const handleClick = (id: string): void => {
    setButtons(buttons => buttons.map(button => ({
      ...button,
      variant: button.id === id ? 'contained' : 'outlined'
    })));
    const isMajorIncident = id === '1';
    onChange({ ...methane, major_incident: isMajorIncident });
  };

  /**
   * Render the component
   */
  return (
    <div className='container'>
      {buttons.map(button => (
        <Button
          style={{ fontSize: '25px', fontWeight: 'bold', borderWidth: 3 }}
          className='btn-select'
          key={`MajorIncident${button.id}`}
          sx={{ m: 0.5, borderRadius: 10 }}
          id={`MajorIncident${button.id}`}
          type='button'
          variant={button.variant}
          onClick={() => handleClick(button.id)}
        >
          {button.text}
        </Button>
      ))}
    </div>
  );
};

/**
 * Export the component
 */
export default MajorIncidentComponent;