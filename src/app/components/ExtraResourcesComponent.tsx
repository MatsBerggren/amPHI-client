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

const initialButtons: ButtonItem[] = [
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
    const [buttons, setButtons] = useState(() => {
        if (methane.extra_resources) {
            initialButtons[0].count = methane.extra_resources.ambulances ? methane.extra_resources.ambulances : 0;
            initialButtons[1].count = methane.extra_resources.chemical_suit ? methane.extra_resources.chemical_suit : 0;
            initialButtons[2].count = methane.extra_resources.commander_unit ? methane.extra_resources.commander_unit : 0;
            initialButtons[3].count = methane.extra_resources.doctor_on_duty ? methane.extra_resources.doctor_on_duty : 0;
            initialButtons[4].count = methane.extra_resources.emergency_wagon ? methane.extra_resources.emergency_wagon : 0;
            initialButtons[5].count = methane.extra_resources.helicopter ? methane.extra_resources.helicopter : 0;
            initialButtons[6].count = methane.extra_resources.medical_team ? methane.extra_resources.medical_team : 0;
            initialButtons[7].count = methane.extra_resources.medical_transport ? methane.extra_resources.medical_transport : 0;
            initialButtons[8].count = methane.extra_resources.PAM ? methane.extra_resources.PAM : 0;
            initialButtons[9].count = methane.extra_resources.sanitation_wagon ? methane.extra_resources.sanitation_wagon : 0;
            initialButtons[10].count = methane.extra_resources.transport_ambulance ? methane.extra_resources.transport_ambulance : 0;
        }
        return initialButtons;
    });

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