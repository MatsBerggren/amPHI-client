import './App.css';

import { EvamApi } from "@evam-life/sdk";
import { EvamAppBarLayout } from "@evam-life/sdk/sdk/component/appbar/EvamAppBarLayout";
import { EvamTab } from "@evam-life/sdk/sdk/component/appbar/EvamTab";
import { EvamTabs } from "@evam-life/sdk/sdk/component/appbar/EvamTabs";
import { Summarize } from "@mui/icons-material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MainView } from "./app/presentation/MainView";
import { store } from './app/store';
import { setActiveCase } from './features/operation';
import createAppTheme from './theme/createAppTheme';

const evam = new EvamApi();
const communicationBaseURL = 'https://amphi.styxacc.sll.se:8443/api/';

const sendToApi = async (endpoint, data) => {
    try {
        const response = await fetch(`${communicationBaseURL}${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(data),
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

evam.onNewOrUpdatedActiveOperation((operation) => {
    console.log(`Updated Operation from SDK: ${JSON.stringify(operation)}`)
    store.dispatch(setActiveCase(operation));
    sendToApi('operations', { "operation": JSON.stringify(operation) });
});

evam.onNewOrUpdatedOperationList((operationList) => {
    console.log(`Updated OperationList from SDK: ${JSON.stringify(operationList)}`)
    operationList?.length && sendToApi('operationlist', { "operationlist": JSON.stringify(operationList) });
});

evam.onNewOrUpdatedAvailableVehicleStatusList(vehicleStatusList => {
    console.log(`Updated Vehicle Status list from SDK: ${JSON.stringify(vehicleStatusList)}`)
    vehicleStatusList?.length && sendToApi('vehiclestatus', { "vehicleStatus": JSON.stringify(vehicleStatusList) });
});

evam.onNewOrUpdatedRakelState(rakelState => {
    console.log(`Updated Rakel State from SDK: ${JSON.stringify(rakelState)}`)
    rakelState?.msisdn && sendToApi('rakelstate', { "rakelState": JSON.stringify(rakelState) });
});

evam.onNewOrUpdatedVehicleState((vehicleState) => {
    console.log(`Updated Vehicle State from SDK: ${JSON.stringify(vehicleState)}`)
    vehicleState?.activeCaseFullId && sendToApi('vehiclestate', { "vehicleState": JSON.stringify(vehicleState) });
});

evam.onNewOrUpdatedSettings((settings) => {
    console.log("Got settings: " + JSON.stringify(settings))
});

evam.onNewOrUpdatedTripLocationHistory((tripLocationHistory) => {
    console.log(`Updated Trip location history from SDK: ${JSON.stringify(tripLocationHistory)}`)
    tripLocationHistory?.etaSeconds && sendToApi('triplocationhistory', { "tripLocationHistory": JSON.stringify(tripLocationHistory) });
});

function App() {
    const theme = createAppTheme();

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <EvamAppBarLayout tabs={
                        <EvamTabs>
                            <EvamTab label={"Vindruterapport"} index={0} icon={<Summarize fontSize={"medium"} />} />
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

export default App;