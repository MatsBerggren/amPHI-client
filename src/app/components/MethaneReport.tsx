import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
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

const steps = [
    { label: 'Större händelse?', component: MajorIncidentComponent },
    { label: 'Exakt plats?', component: ExactLocationComponent },
    { label: 'Typ av händelse?', component: TypesComponent },
    { label: 'Hot/Risker?', component: HazardsComponent },
    { label: 'Ankomstväg hinder?', component: AccessRoadComponent },
    { label: 'Antal drabbade?', component: NumberOfAffected },
    { label: 'Extra resurser?', component: ExtraResourcesComponent },
];

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
            const response = await fetch(`https://192.168.50.25:8443/api/methanereport`, {
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
            <div className="container flex-container" >
                <div className="container container-33">
                    <Stepper activeStep={activeStep}>
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel>
                                    
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Typography>{steps[activeStep].label}</Typography>
                </div>
                <div className='container flex-container'>
                    <StepComponent methane={methane} onChange={setMethane} />
                </div>
            </div>
            <div className="container flex-container">
                <Button
                    sx={{ m: 0.5, borderRadius: 10 }}
                    className='btn'
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    variant={"contained"}
                >
                    <KeyboardArrowLeft />
                    Back
                </Button>
                <Button
                    sx={{ m: 0.5, borderRadius: 10 }}
                    className='btn'
                    type="submit"
                    variant={"contained"}
                >
                    Skicka rapport
                </Button>
                <Button
                    sx={{ m: 0.5, borderRadius: 10 }}
                    className='btn'
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                    variant={"contained"}
                >
                    Next
                    <KeyboardArrowRight />
                </Button>
            </div>
        </form>
    );
};

export default MethaneReport;