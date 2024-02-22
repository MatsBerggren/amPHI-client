import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import Methane from '../classes/Methane';
import AccessRoadComponent from './AccessRoadComponenet';
import ExactLocationComponent from './ExactLocationComponent';
import ExtraResourcesComponent from './ExtraResourcesComponent';
import HazardsComponent from './HazardsComponent';
import MajorIncidentComponent from './MajorIncidentComponent';
import "./MethaneReport.css";
import NumberOfAffected from './NumbersAffectedComponent';
import TypesComponent from './TypesComponent';
import { EvamApi } from '@evam-life/sdk';

const steps = [
    { label: 'Större händelse?', component: MajorIncidentComponent },
    { label: 'Exakt plats?', component: ExactLocationComponent },
    { label: 'Typ av händelse?', component: TypesComponent },
    { label: 'Hot/Risker?', component: HazardsComponent },
    { label: 'Ankomstväg hinder?', component: AccessRoadComponent },
    { label: 'Antal drabbade?', component: NumberOfAffected },
    { label: 'Extra resurser?', component: ExtraResourcesComponent },
];

// const evam = new EvamApi();
// const amPHIHostName = evam.store.get('amPHIHostName');
// const communicationBaseURL = 'https://' + amPHIHostName + '/api/';
const communicationBaseURL = 'https://amphi.styxacc.sll.se:8443/api/';

console.log('communicationBaseURL: ', communicationBaseURL);

const MethaneReport: React.FC = () => {
    const [methane, setMethane] = useState<Methane>({} as Methane);
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = steps.length;

    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(methane);
        try {
            const obj = { "methaneReport": JSON.stringify(methane) };
            const response = await fetch(`${communicationBaseURL}methanereport`, {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error: ', error instanceof Error ? error.message : 'An unexpected error occurred');
            return error instanceof Error ? error.message : 'An unexpected error occurred';
        }
    };

    const StepComponent = steps[activeStep].component;

    return (
        <form onSubmit={handleSubmit}>
            <div className="container" >
                <div className="container">
                    <Typography variant={"h4"}>{steps[activeStep].label}</Typography>
                </div>
                <div className='container flex-container'>
                    <StepComponent methane={methane} onChange={setMethane} />
                </div>
            </div>
            <div className="container-footer">
                <Button
                    style={{ fontSize: '25px', fontWeight: 'bold', borderWidth: 3 }}
                    sx={{ m: 0.5, borderRadius: 10 }}
                    className='btn'
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    variant={"contained"}
                >
                    <KeyboardArrowLeft />
                    <KeyboardArrowLeft />
                </Button>
                <Button
                    style={{ fontSize: '25px', fontWeight: 'bold', borderWidth: 3 }}
                    sx={{ m: 0.5, borderRadius: 10 }}
                    className='btn'
                    type="submit"
                    variant={"contained"}
                >
                    Skicka
                </Button>
                <Button
                    style={{ fontSize: '25px', fontWeight: 'bold', borderWidth: 4 }}
                    sx={{ m: 0.5, borderRadius: 10 }}
                    className='btn'
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                    variant={"contained"}
                >
                    <KeyboardArrowRight />
                    <KeyboardArrowRight />
                </Button>
            </div>
        </form>
    );
};

export default MethaneReport;