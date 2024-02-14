/**
 * Importing required components and hooks from libraries
 */
import { Button } from '@mui/material';
import React, { useCallback, useState } from 'react';
import Methane from '../classes/Methane';

/**
 * ButtonState interface to define the structure of state for each button
 */
interface ButtonState {
  text: string;
  id: string;
  variant: "outlined" | "text" | "contained";
}

/**
 * Initial state for the buttons
 */
const initialState: ButtonState[] = [
  { text: 'Ja', id: '1', variant: 'outlined' },
  { text: 'Nej', id: '2', variant: 'outlined' }
];

/**
 * MajorIncidentComponent is a functional component that receives methane and onChange as props
 */
const MajorIncidentComponent: React.FC<{ methane: Methane, onChange: (value: Methane) => void }> = ({ methane, onChange }) => {
  /**
   * State for the buttons and majorIncident
   */
  const [buttons, setButtons] = useState(initialState);
  const [, setMajorIncident] = useState(false);

  /**
   * Function to update the variant of each button and the majorIncident state
   */
  const updateButtonVariant = useCallback((id: string) => {
    setButtons(buttons => buttons.map(button => ({
      ...button,
      variant: button.id === id ? 'contained' : 'outlined'
    })));
    const isMajorIncident = id === '1';
    setMajorIncident(isMajorIncident);
    onChange({ ...methane, major_incident: isMajorIncident });
  }, [onChange, methane]);

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
            onClick={() => updateButtonVariant(button.id)}
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