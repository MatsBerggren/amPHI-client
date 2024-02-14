/**
 * Importing necessary libraries and components
 */
import { Button } from "@mui/material";
import React, { useState } from "react";
import Methane from "../classes/Methane";

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
const buttonLabels = ["Annan", "Brand", "Explosion", "Halka", "Inga", "Kyla", "Ras", "Rök/Gas", "Trafikfara", "Trängsel", "Våld"];

/**
 * Initial state of the buttons
 */
const initialButtons: ButtonProps[] = buttonLabels.map((text, index) => ({
    text,
    id: (index + 1).toString(),
    variant: 'outlined',
}));

/**
 * HazardsComponent is a functional component that receives 'methane' and 'onChange' as props.
 * It manages the state of the buttons and hazards.
 * When a button is clicked, it toggles the variant of the button between "outlined" and "contained",
 * and updates the hazards state accordingly.
 */
const HazardsComponent: React.FC<{ methane: Methane, onChange: (value: Methane) => void }> = ({ methane, onChange }) => {
    const [buttons, setButtons] = useState<ButtonProps[]>(initialButtons);
    const [hazards, setHazards] = useState<string[]>([]);

    /**
     * Function to handle button click events
     */
    const handleClick = (id: string): void => {
        const updatedButtons = buttons.map((button) =>
            button.id === id
                ? { ...button, variant: button.variant === "contained" ? "outlined" : "contained" }
                : button
        );
        setButtons(updatedButtons as ButtonProps[]);
        const updatedHazards = updatedButtons.filter((button) => button.variant === "contained").map((button) => button.text);
        setHazards(updatedHazards);
        onChange({ ...methane, hazards: updatedHazards });
    };

    /**
     * Rendering the component
     */
    return (
        <div className='flex-container-wrap'>
            {buttons.map(button => (
                <Button
                    style={{ fontSize: '25px', fontWeight: 'bold', borderWidth: 3 }}
                    className="btn-select"
                    key={"Hazards" + button.id}
                    sx={{ m: 0.5, borderRadius: 10 }}
                    id={"Hazards" + button.id}
                    type="button"
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
 * Exporting the HazardsComponent
 */
export default HazardsComponent;