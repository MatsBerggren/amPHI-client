import './App.css';

import { EvamApi, Operation, RakelState, TripLocationHistory, VehicleState, VehicleStatus } from "@evam-life/sdk";
import { EvamAppBarLayout } from "@evam-life/sdk/sdk/component/appbar/EvamAppBarLayout";
import { EvamTab } from "@evam-life/sdk/sdk/component/appbar/EvamTab";
import { EvamTabs } from "@evam-life/sdk/sdk/component/appbar/EvamTabs";
import { Info, Summarize } from "@mui/icons-material";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MainView } from "./app/presentation/MainView";
import { store } from './app/store';
import { setActiveCase } from './features/operation';

// Get Evam SDK instance
const evam = new EvamApi()

evam.onNewOrUpdatedActiveOperation((operation) => {
    // On new active operation, update redux store
    let payload = setActiveCase(operation)
    console.log("Got Operation: " + JSON.stringify(operation))
    store.dispatch(payload)
    if (operation?.operationID) {
        operation.selectedHospital=1;
        operation.selectedPriority=1;
        sendOperation(operation);
    }
})
evam.onNewOrUpdatedAvailableVehicleStatusList((vehicleStatusList) => {
    console.log("Got vehicle status: " + JSON.stringify(vehicleStatusList))
    if ((vehicleStatusList?.length ?? 0) > 0) {
        sendAvailableVehicleStatusList(vehicleStatusList);
    }
});

evam.onNewOrUpdatedRakelState((rakelState) => {
    console.log("Got rakel state: " + JSON.stringify(rakelState))
    if (rakelState?.msisdn) {
        sendRakelState(rakelState);
    }
});

evam.onNewOrUpdatedVehicleState((vehicleState) => {
    console.log("Got vehicle state: " + JSON.stringify(vehicleState))
    if (vehicleState?.activeCaseFullId) {
        sendState(vehicleState);
    }
});

evam.onNewOrUpdatedSettings((settings) => {
    console.log("Got settings: " + JSON.stringify(settings))
});

evam.onNewOrUpdatedTripLocationHistory((tripLocationHistory) => {
    console.log("Got trip location history: " + JSON.stringify(tripLocationHistory))
    if (tripLocationHistory?.etaSeconds) {
        sendTripLocationHistory(tripLocationHistory);
    }
});


const ipAddress = evam.store.get('IpAddress');
const port = evam.store.get('Port');
const communicationBaseURL = 'http://' + ipAddress + ':' + port + '/api/'
evam.store.set('IpAddress', '192.168.50.15');
evam.store.set('Port', '8080');
/**
 * Main app component
 */
function App() {

    // Define colors
    const APP_COLORS = {
        day: {
            black0: "#000000",
            black0_5: "#17181B",
            black1: "#202124",
            black2: "#282A2D",
            black3: "#2E3134",
            black4: "#3C4043",
            //orange_primary: "#FF5F5E",
            orange_primary: "#FF7B52",
            orange_secondary: "#FF7B52",
            orange_tertiary: "#FFBCA9",
            blue1: "#0857C3",
            blue2: "#5C88DA",
            red1: "#E10600"
        },
        night: {
            black0: "#000000",
            black0_5: "#0E1013",
            black1: "#17181B",
            black2: "#202124",
            black3: "#282A2D",
            black4: "#2E3134",
            orange_primary: "#FF5F5E",
            orange_secondary: "#FF7B52",
            orange_tertiary: "#FFBCA9",
            blue1: "#0857C3",
            blue2: "#5C88DA",
            red1: "#E10600"
        }
    }

    const palette = APP_COLORS.day

    // Define theme
    const theme = createTheme({
        transitions: {
            duration: {
                shortest: 150,
                shorter: 200,
                short: 250,
                // most basic recommended timing
                standard: 300,
                // this is to be used in complex animations
                complex: 375,
                // recommended when something is entering screen
                enteringScreen: 225,
                // recommended when something is leaving screen
                leavingScreen: 195,
            },
        },
        palette: {
            background: {
                default: palette.black0,
                paper: palette.black4
            },
            text: {
                primary: "#FFFFFF",
                secondary: "#BBBBBB",
                disabled: "#999999"
            },
            primary: {
                main: palette.orange_primary,
            },
            secondary: {
                main: palette.orange_secondary,
            },
        },
        components: {
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: false,
                    centerRipple: true,
                }
            }
        },
        typography: {
            body1: {
                fontSize: "16px"
            },
            h4: {
                marginBottom: "12px"
            },
            h2: {
                marginBottom: "20px"
            },
            h1: {
                marginBottom: "28px"
            }
        },
    });

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <EvamAppBarLayout tabs={
                        <EvamTabs>
                            <EvamTab label={"Vindruterapport"} index={0} icon={<Summarize fontSize={"medium"} />} />
                            <EvamTab label={"Status"} index={1} icon={<Info fontSize={"medium"} />} />
                            <EvamTab label={"Status"} index={2} icon={<Info fontSize={"medium"} />} />
                            <EvamTab label={"Status"} index={3} icon={<Info fontSize={"medium"} />} />
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

type CreateUserResponse = {
    name: string;
    job: string;
    id: string;
    createdAt: string;
};

async function sendOperation(operation: Operation | undefined) {
    try {
        var obj = { "operation": JSON.stringify(operation) };
        console.log(obj)
        const response = await fetch('http://192.168.50.15:8080/api/operations', {
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

        // 👇️ const result: CreateUserResponse
        const result = (await response.json()) as CreateUserResponse;

        console.log('result is: ', JSON.stringify(result, null, 4));

        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

async function sendState(vehicleState: VehicleState | undefined) {
    try {
        var obj = { "vehicleState": JSON.stringify(vehicleState) };
        console.log(obj)
        const response = await fetch('http://192.168.50.15:8080/api/vehiclestate', {
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

        const result = (await response.json()) as CreateUserResponse;

        console.log('result is: ', JSON.stringify(result, null, 4));

        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

async function sendRakelState(rakelState: RakelState | undefined) {
    try {
        var obj = { "rakelState": JSON.stringify(rakelState) };
        console.log(obj)
        const response = await fetch('http://192.168.50.15:8080/api/rakelstate', {
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

        const result = (await response.json()) as CreateUserResponse;

        console.log('result is: ', JSON.stringify(result, null, 4));

        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

async function sendAvailableVehicleStatusList(vehicleStatus: VehicleStatus[] | undefined) {
    try {
        var obj = { "vehicleStatus": JSON.stringify(vehicleStatus) };
        console.log(obj)
        const response = await fetch('http://192.168.50.15:8080/api/vehiclestatus', {
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

        const result = (await response.json()) as CreateUserResponse;

        console.log('result is: ', JSON.stringify(result, null, 4));

        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

async function sendTripLocationHistory(tripLocationHistory: TripLocationHistory | undefined) {
    try {
        var obj = { "tripLocationHistory": JSON.stringify(tripLocationHistory) };
        console.log(obj)
        const response = await fetch('http://192.168.50.15:8080/api/triplocationhistory', {
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

        const result = (await response.json()) as CreateUserResponse;

        console.log('result is: ', JSON.stringify(result, null, 4));

        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

export default App;

