import './App.css';

import {setActiveCase} from './features/operation';
import {store} from './app/store';
import {Box, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {APP_COLORS} from "./colors";
import * as React from "react";
import {
    Archive,
    CarCrash,
    Home, Notifications,
} from "@mui/icons-material";
import {MainView} from "./app/presentation/MainView";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {MenuOption1View} from "./app/presentation/MenuOption1View";
import {MenuOption2View} from "./app/presentation/MenuOption2View";
import {EvamApi} from "@evam-life/sdk";
import {
    EvamAppBarLayout
} from "@evam-life/sdk/sdk/component/appbar/EvamAppBarLayout";
import {EvamTabs} from "@evam-life/sdk/sdk/component/appbar/EvamTabs";
import {EvamTab} from "@evam-life/sdk/sdk/component/appbar/EvamTab";
import {
    EvamHamburgerMenu
} from "@evam-life/sdk/sdk/component/appbar/EvamHamburgerMenu";
import {EvamMenuItem} from "@evam-life/sdk/sdk/component/appbar/EvamMenuItem";
import {
    formatRoutePathByMenuId
} from "@evam-life/sdk/sdk/component/appbar/utils/formatRoutePathByMenuId";

// Get Evam SDK instance
const evam = new EvamApi()

evam.onNewOrUpdatedActiveOperation((operation) => {
    // On new active operation, update redux store
    let payload = setActiveCase(operation)
    store.dispatch(payload)
})

evam.onNewOrUpdatedSettings((settings) => {
    console.log("Got settings: " + JSON.stringify(settings))
})

/**
 * Main app component
 */
function App() {
    const palette = APP_COLORS.day

    // App theme
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
                fontSize: "28px"
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
                <CssBaseline/>
                <Router>
                    <EvamAppBarLayout tabs={
                        <EvamTabs>
                            <EvamTab label={"Home"} index={0} icon={<Home fontSize={"large"}/>}/>
                            <EvamTab label={"Notification API"} index={1} icon={<Notifications fontSize={"large"}/>}/>
                            <EvamTab label={"Operation API"} index={2} icon={<CarCrash fontSize={"large"}/>}/>
                        </EvamTabs>
                    } extraFunction={
                        <EvamHamburgerMenu  sx={{backdropFilter: "blur(5px)"}}>
                            <Box height={600} width={500}>
                                <EvamMenuItem id={"Option 1"}>Menu option 1</EvamMenuItem>
                                <EvamMenuItem id={"Option 2"}>Menu option 2</EvamMenuItem>
                            </Box>
                        </EvamHamburgerMenu>
                    }>
                        <Routes>
                            <Route path={"/"} element={
                                <MainView/>
                            }/>
                            <Route
                                path={formatRoutePathByMenuId("Option 1")}
                                element={<MenuOption1View/>}/>
                            <Route
                                path={formatRoutePathByMenuId("Option 2")}
                                element={<MenuOption2View/>}/>
                        </Routes>
                    </EvamAppBarLayout>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
