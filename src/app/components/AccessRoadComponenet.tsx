import { Button } from "@mui/material";
import React, { useState } from "react";
import Methane from "../classes/Methane";
import AccessRoad from "../classes/AccessRoad";

interface ButtonState {
    text: string;
    id: string;
    variant: "outlined" | "text" | "contained";
}

const AccessRoadComponent: React.FC<{ methane: Methane, onChange: (value: Methane) => void }> = ({ methane, onChange }) => {
    const initialState: ButtonState[] = [
        { text: 'Ja', id: '1', variant: 'outlined' },
        { text: 'Nej', id: '2', variant: 'outlined' }
    ];

    const [buttons, setButtons] = useState(initialState);
    const [, setIsObstructed] = useState(false);

    const updateButtonVariant = (id: string) => {
        return buttons.map(button => ({
            ...button,
            variant: button.id === id ? 'contained' : 'outlined'
        }));
    };

    const handleClick = (id: string) => {
        setButtons(updateButtonVariant(id) as ButtonState[]);
        const obstructionStatus = id === '1';
        setIsObstructed(obstructionStatus);
        
        const accessRoad: AccessRoad = {
            is_obstructed: obstructionStatus,
            comment: ""
        };
        onChange({ ...methane, access_road: accessRoad });
    };

    return (
        <div className='container'>
                {buttons.map(button =>
                    <Button
                        style={{ fontSize: '25px', fontWeight: 'bold', borderWidth: 3 }}
                        className="btn-select"
                        key={`AccessRoad${button.id}`}
                        sx={{ m: 0.5, borderRadius: 10 }}
                        id={`AccessRoad${button.id}`}
                        type="button"
                        variant={button.variant}
                        onClick={() => handleClick(button.id)}
                    >
                        {button.text}
                    </Button>
                )}
            </div>
    );
};

export default AccessRoadComponent;