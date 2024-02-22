import { EvamApi } from '@evam-life/sdk';
import { Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const evam = new EvamApi();

const initialState = {
    amPHIHostName: evam.store.get('amPHIHostName'),
    smtpServer: evam.store.get('smtpServer'),
    useMail: evam.store.get('useMail') === 'true' ? true : false,
};

const SettingsTab: React.FC = () => {
    const [state, setState] = useState(initialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isCheckbox = event.target.type === "checkbox";
        const { name, value, checked } = event.target;
        const finalValue = isCheckbox ? checked : value;
        setState(prevState => ({ ...prevState, [name]: finalValue }));
        evam.store.set(name, finalValue.toString());
    };

    return (
        <div className="container">
            <Typography variant={"h4"}>Inställningar</Typography>
            <div className='container flex-container'>
                <TextField
                    label="Värdnamn för amPHI-enhet"
                    margin="normal"
                    fullWidth
                    focused
                    id="amPHIHostName"
                    name="amPHIHostName"
                    type="text"
                    variant="outlined"
                    value={state.amPHIHostName}
                    onChange={handleChange}
                />
                <TextField
                    label="SMTP-server för e-post"
                    margin="normal"
                    fullWidth
                    focused
                    id="smtpServer"
                    name="smtpServer"
                    type="text"
                    variant="outlined"
                    value={state.smtpServer}
                    onChange={handleChange}
                />
                <FormControlLabel
                    label="Skicka methanerapport via e-post"
                    name='useMail'
                    labelPlacement='start'
                    control={<Checkbox checked={state.useMail} onChange={handleChange} />}
                />
            </div>
        </div>
    );
};

export default SettingsTab;