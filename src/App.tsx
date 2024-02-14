import './App.css';

import { EvamApi, Operation, RakelState, TripLocationHistory, VehicleState, VehicleStatus } from "@evam-life/sdk";
import { EvamAppBarLayout } from "@evam-life/sdk/sdk/component/appbar/EvamAppBarLayout";
import { EvamTab } from "@evam-life/sdk/sdk/component/appbar/EvamTab";
import { EvamTabs } from "@evam-life/sdk/sdk/component/appbar/EvamTabs";
import { Info, Summarize } from "@mui/icons-material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MainView } from "./app/presentation/MainView";
import { store } from './app/store';
import { setActiveCase } from './features/operation';
import createAppTheme from './theme/createAppTheme';

// Get Evam SDK instance
const evam = new EvamApi()
const communicationBaseURL = 'https://FRAUA011243.styxacc.sll.se:8443/api/'
//const communicationBaseURL = 'https://SCPF4BJ6QA.scandihealth.com:8443/api/'

evam.onNewOrUpdatedActiveOperation((operation) => {
    console.log(`Updated Operation from SDK: ${JSON.stringify(operation)}`)
    store.dispatch(setActiveCase(operation));
    if (operation?.operationID) {
        operation.selectedHospital = 1;
        sendOperation(operation);
    }
});

evam.onNewOrUpdatedAvailableVehicleStatusList(vehicleStatusList => {
    console.log(`Updated Vehicle Status list from SDK: ${JSON.stringify(vehicleStatusList)}`)
    vehicleStatusList?.length && sendAvailableVehicleStatusList(vehicleStatusList);
});

evam.onNewOrUpdatedRakelState(rakelState => {
    console.log(`Updated Rakel State from SDK: ${JSON.stringify(rakelState)}`)
    rakelState?.msisdn && sendRakelState(rakelState);
});

evam.onNewOrUpdatedVehicleState((vehicleState) => {
    console.log(`Updated Vehicle State from SDK: ${JSON.stringify(vehicleState)}`)
    vehicleState?.activeCaseFullId && sendState(vehicleState);
});

evam.onNewOrUpdatedSettings((settings) => {
    console.log("Got settings: " + JSON.stringify(settings))
});

evam.onNewOrUpdatedTripLocationHistory((tripLocationHistory) => {
    console.log(`Updated Trip location history from SDK: ${JSON.stringify(tripLocationHistory)}`)
    tripLocationHistory?.etaSeconds && sendTripLocationHistory(tripLocationHistory);
});

/**
 * Main app component
 */
function App() {

    // Define theme
    const theme = createAppTheme();
    
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <EvamAppBarLayout tabs={
                        <EvamTabs>
                            <EvamTab label={"Vindruterapport"} index={0} icon={<Summarize fontSize={"medium"} />} />
                            <EvamTab label={"Inställningar"} index={1} icon={<Info fontSize={"medium"} />} />
                        </EvamTabs>
                    } >
                        <Routes>
                            <Route path={"/"} element={
                                <MainView />
                            } />
                        </Routes>
                    </EvamAppBarLayout>
                </Router>
            </ThemeProvider>
        </div>
    );
}

async function sendOperation(operation: Operation | undefined) {
    try {
        const obj = { "operation": JSON.stringify(operation) };
        const response = await fetch(`${communicationBaseURL}operations`, {
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
        console.error('Error occurred: ', error);
        return error instanceof Error ? error.message : 'An unexpected error occurred';
    }
}
async function sendState(vehicleState: VehicleState | undefined) {
    try {
        const obj = { "vehicleState": JSON.stringify(vehicleState) };
        const response = await fetch(`${communicationBaseURL}vehiclestate`, {
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
        console.error('Error:', error instanceof Error ? error.message : 'An unexpected error occurred');
        return error instanceof Error ? error.message : 'An unexpected error occurred';
    }
}

async function sendRakelState(rakelState: RakelState | undefined) {
    try {
        const obj = { rakelState: JSON.stringify(rakelState) };
        const response = await fetch(`${communicationBaseURL}rakelstate`, {
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
}

async function sendAvailableVehicleStatusList(vehicleStatus: VehicleStatus[] | undefined) {
    try {
        const obj = { "vehicleStatus": JSON.stringify(vehicleStatus) };
        const response = await fetch(`${communicationBaseURL}vehiclestatus`, {
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
}

async function sendTripLocationHistory(tripLocationHistory: TripLocationHistory | undefined) {
    try {
        const obj = { "tripLocationHistory": JSON.stringify(tripLocationHistory) };
        const response = await fetch(`${communicationBaseURL}triplocationhistory`, {
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
}

export default App;

