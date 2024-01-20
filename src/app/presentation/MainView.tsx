import { EvamApi, Notification, NotificationType } from "@evam-life/sdk";
import { EvamTabPanel } from "@evam-life/sdk/sdk/component/appbar/EvamTabPanel";
import { Button, Typography } from "@mui/material";
import MethaneReport from "../components/MethaneReport";

const sendNotification = () => {
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
}

export function MainView() {
    return (
        <div>
            <EvamTabPanel index={0}>
                <MethaneReport />
            </EvamTabPanel>
            <EvamTabPanel index={1}>
                <Typography variant={"h2"}>Notification API example</Typography>
                <Typography variant={"h4"}>Click the button below to send a notification using the Evam SDK.</Typography>
                <Button variant={"contained"} onClick={sendNotification}>Send notification</Button>
            </EvamTabPanel>
            <EvamTabPanel index={2}>
                <Typography variant={"h2"}>Inställningar</Typography>
                <Typography variant={"h4"}>Click the button below to send a notification using the Evam SDK.</Typography>
                <Button variant={"contained"} onClick={() => { }}>Spara Inställningar</Button>
            </EvamTabPanel>
        </div>
    )
}