import { Button } from "@mui/material";
import React, { useState } from "react";

interface ButtonData {
    text: string;
    id: string;
    variant: 'outlined' | 'contained';
}

const BUTTON_TEXTS = ["Annan", "Brand", "Explosion", "Farligt gods", "Flygolycka", "Hot", "Ras", "Sjöolycka", "Trafikolycka", "Tågolycka", "Våld"];

const TypAvHandelse: React.FC = () => {
    const initialButtonsState: ButtonData[] = BUTTON_TEXTS.map((text, index) => ({
        text,
        id: (index + 1).toString(),
        variant: 'outlined'
    }));

    const [buttons, setButtons] = useState<ButtonData[]>(initialButtonsState)

    const handleClick = (id: string): void => {
        setButtons(buttons.map(button => button.id === id ? { ...button, variant: button.variant === "contained" ? "outlined" : "contained" } : button));
    }

    return (
        <div className="container">
            <div className="labels">
                <label>Typ av händelse:</label>
            </div>
            <div className="input-tab">
                {buttons.map((button) => (
                    <Button
                        key={`TypAvHandelse${button.id}`}
                        sx={{ m: 0.5 }}
                        id={`TypAvHandelse${button.id}`}
                        type="button"
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

export default TypAvHandelse;