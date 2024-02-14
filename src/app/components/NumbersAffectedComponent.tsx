import { Button, ButtonGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import Methane from "../classes/Methane";

interface ButtonItem {
    text: string;
    id: string;
    count: number;
}

const BUTTON_ITEMS: ButtonItem[] = [
    { text: "Grön", id: '0', count: 0 },
    { text: "Gul", id: '1', count: 0 },
    { text: "Röd", id: '2', count: 0 },
];

const NumbersAffected: React.FC<{ methane: Methane, onChange: (value: Methane) => void }> = ({ methane, onChange }) => {
    const [buttons, setButtons] = useState<ButtonItem[]>(BUTTON_ITEMS);

    const updateCount = (id: string, increment: boolean) => {
        const updatedButtons = buttons.map(button =>
            button.id === id
                ? { ...button, count: Math.max(button.count + (increment ? 1 : -1), 0) }
                : button
        );
        setButtons(updatedButtons);

        const updatedMethane = {
            ...methane,
            numbers_affected_green: updatedButtons[0].count,
            numbers_affected_yellow: updatedButtons[1].count,
            numbers_affected_red: updatedButtons[2].count
        };
        onChange(updatedMethane);
    };

    return (
        <div className='flex-container-wrap'>
            {buttons.map(button => (
                <div className="flex-container-counters">
                    <ButtonGroup>
                        <Button style={{ fontSize: '25px', fontWeight: 'bold', borderWidth: 3 }} className="btn-counters" variant="contained" onClick={() => updateCount(button.id, false)}>-</Button>
                        <Button style={{ fontSize: '25px', fontWeight: 'bold', borderWidth: 3 }} className="btn-counters">{button.count}</Button>
                        <Button style={{ fontSize: '25px', fontWeight: 'bold', borderWidth: 3 }} className="btn-counters" variant="contained" onClick={() => updateCount(button.id, true)}>+</Button>
                    </ButtonGroup>
                    <Typography id={button.id}>{button.text}</Typography>
                </div>
            ))}
        </div>
    );
};

export default NumbersAffected;