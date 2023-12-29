import { EvamApi, Notification, NotificationType } from "@evam-life/sdk";
import { EvamTabPanel } from "@evam-life/sdk/sdk/component/appbar/EvamTabPanel";
import { Button, Typography } from "@mui/material";
import AllvarligHandelse from "../components/AllvarligHandelse";
import AnkomstvagHindrad from "../components/AnkomstvagHindrad";
import ExaktLokalisation from "../components/ExaktLokalisation";
import ExtraResurser from "../components/ExtraResurser";
import HotRisker from "../components/HotRisker";
import MethaneReport from "../components/MethaneReport";
import NumerarAvDrabbade from "../components/NumerarAvDrabbade";
import Status from "../components/Status";
import TypAvHandelse from "../components/TypAvHandelse";

export function MainView() {

    return (
        <div>
            <EvamTabPanel index={0}>
                <div>
                    <AllvarligHandelse />
                    <ExaktLokalisation />
                    <TypAvHandelse />
                    <HotRisker />
                    <AnkomstvagHindrad />
                    <NumerarAvDrabbade />
                    <ExtraResurser />
                    <div className="btn">
                        <Button variant={"contained"} onClick={() => { }}>Skicka rapport</Button>
                    </div>
                </div>
            </EvamTabPanel>
            <EvamTabPanel index={1}>
                <MethaneReport />
            </EvamTabPanel>
            <EvamTabPanel index={2}>
                <div>
                    <Typography variant={"h2"}>Notification API
                        example</Typography>
                    <Typography variant={"h4"}>Click the button below to send
                        a notification using the Evam SDK.</Typography>
                    <Button variant={"contained"} onClick={() => {
                        const evamApi = new EvamApi();

                        const notification = Notification.fromJSON({
                            heading: "Example Notification",
                            description: "Clicking the buttons below will log a message in the console, please try!",
                            notificationType: NotificationType.ACTION_HUN,
                            primaryButton: {
                                label: "Primary Button",
                                callback: () => {
                                    console.log('Primary Button clicked on test notification');
                                }
                            },
                            secondaryButton: {
                                label: "Secondary Button",
                                callback: () => {
                                    console.log('Secondary Button clicked on test notification');
                                }
                            }
                        });

                        evamApi.sendNotification(notification);
                    }}>Send notification</Button>
                </div>
            </EvamTabPanel>
            <EvamTabPanel index={3}>
                <div>
                    <Typography variant={"h2"}>Inställningar</Typography>
                    <Typography variant={"h4"}>Click the button below to send a notification using the Evam SDK.</Typography>
                    <Button variant={"contained"} onClick={() => {
                    }}>Spara Inställningar</Button>
                </div>
            </EvamTabPanel>
        </div>
    )
}