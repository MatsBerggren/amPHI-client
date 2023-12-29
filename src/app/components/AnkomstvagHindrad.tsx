import { Button } from "@mui/material";
import React, { useState } from "react";

const BUTTONS_DEFAULT = [
    { text: "Ja", id: '1', variant: 'outlined' },
    { text: "Nej", id: '2', variant: 'outlined' }
];

const updateButtonVariant = (id, buttons) =>
    buttons.map(button =>
        button.id === id ? { ...button, variant: 'contained' } : { ...button, variant: 'outlined' }
    );

const AnkomstvagHindrad = () => {
    const [buttons, setButtons] = useState(BUTTONS_DEFAULT);

    const handleClick = (id) => {
        setButtons(buttons => updateButtonVariant(id, buttons));
    }

    return (
        <div className="container">
            <div className="labels">
                <label>Ankomstväg hindrad:</label>
            </div>
            <div className="input-tab">
                {buttons.map(button =>
                    <Button
                        key={`AnkomstvagHindrad${button.id}`}
                        sx={{ m: 0.5 }}
                        id={`AnkomstvagHindrad${button.id}`}
                        type="button"
                        variant={button.variant as "outlined" | "text" | "contained"}
                        onClick={() => handleClick(button.id)}
                    >
                        {button.text}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AnkomstvagHindrad;