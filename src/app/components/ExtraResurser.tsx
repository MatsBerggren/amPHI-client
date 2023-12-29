import { Typography, ButtonGroup, Button } from "@mui/material";
import React, { useState } from "react";

interface ButtonItem {
    text: string;
    id: string;
    count: number;
}

const BUTTON_ITEMS: ButtonItem[] = [
    { text: "Ambulans", id: '1', count: 0 },
    { text: "Akutbil/Jourläkarbil", id: '2', count: 0 },
    { text: "HKP", id: '3', count: 0 },
    { text: "Ledningsenhet", id: '4', count: 0 },
    { text: "PAM", id: '5', count: 0 },
    { text: "Sjuktransport", id: '6', count: 0 },
    { text: "Transportambulans", id: '7', count: 0 },
];

const ExtraResurser: React.FC = () => {

    const [buttons, setButtons] = useState<ButtonItem[]>(BUTTON_ITEMS);

    const incrementCount = (id: string) => {
        setButtons(buttons.map(button => (button.id === id) ? { ...button, count: button.count + 1 } : button));
    };

    const decrementCount = (id: string) => {
        setButtons(buttons.map(button => (button.id === id && button.count > 0) ? { ...button, count: button.count - 1 } : button));
    };

    return (
        <div className="container">
            <div className="labels">
            <Typography variant="h6">Extra resurser:</Typography>
            </div>
            <div className="input-tab">
            {buttons.map(button => (
                <div key={button.id} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    <ButtonGroup sx={{ marginLeft: 0.5 }} aria-label="small outlined button group">
                        <Button onClick={() => decrementCount(button.id)}>-</Button>
                        <Button>{button.count}</Button>
                        <Button onClick={() => incrementCount(button.id)}>+</Button>
                    </ButtonGroup>
                    <Typography sx={{ marginLeft: 2 }} id={button.id}>{button.text}</Typography>
                </div>
                
            ))}
            </div>
        </div>
    );
};

export default ExtraResurser;