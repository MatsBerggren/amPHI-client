import { Button, ButtonGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import ExtraResources from "../classes/ExtraResources";
import Methane from "../classes/Methane";

interface ButtonItem {
    text: string;
    field: string;
    id: string;
    count: number;
}

const BUTTON_ITEMS: ButtonItem[] = [
    { text: "Ambulans", field: "ambulances", id: '0', count: 0 },
    { text: "Kemisk skyddsdräkt", field: "chemical_suit", id: '1', count: 0 },
    { text: "Ledningsenhet", field: "commander_unit", id: '2', count: 0 },
    { text: "Jourhavande läkare", field: "doctor_on_duty", id: '3', count: 0 },
    { text: "Akutbil/Jourläkarbil", field: "emergency_wagon", id: '4', count: 0 },
    { text: "HKP", field: "helicopter", id: '5', count: 0 },
    { text: "Medicinskt team", field: "medical_team", id: '6', count: 0 },
    { text: "Medicinsk Transport", field: "medical_transport", id: '7', count: 0 },
    { text: "PAM", field: "PAM", id: '8', count: 0 },
    { text: "Saneringsenhet", field: "sanitation_wagon", id: '9', count: 0 },
    { text: "Transportambulans", field: "transport_ambulance", id: '10', count: 0 },
];

const ExtraResourcesComponent: React.FC<{ methane: Methane, onChange: (value: Methane) => void }> = ({ methane, onChange }) => {

    const [buttons, setButtons] = useState<ButtonItem[]>(BUTTON_ITEMS);

    const updateCount = (id: string, increment: boolean) => {
        const updatedButtons = buttons.map(button =>
            button.id === id
                ? { ...button, count: Math.max(button.count + (increment ? 1 : -1), 0) }
                : button
        );
        setButtons(updatedButtons);

        const extraResources = updatedButtons.reduce((acc, button) => {
            acc[button.field] = button.count;
            acc.units_total += button.count;
            return acc;
        }, { units_total: 0 } as ExtraResources);

        onChange({ ...methane, extra_resources: extraResources });
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

export default ExtraResourcesComponent;