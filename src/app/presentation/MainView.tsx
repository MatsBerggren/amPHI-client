import { EvamApi, Notification, NotificationType } from "@evam-life/sdk";
import { EvamTabPanel } from "@evam-life/sdk/sdk/component/appbar/EvamTabPanel";
import { Button, Typography } from "@mui/material";
import MethaneReport from "../components/MethaneReport";

export function MainView() {
    return (
        <div>
            <EvamTabPanel index={0}>
                <MethaneReport />
            </EvamTabPanel>
            <EvamTabPanel index={1}>
                <Typography variant={"h2"}>Inställningar</Typography>
                <Typography variant={"h4"}>Click the button below to send a notification using the Evam SDK.</Typography>
                <Button variant={"contained"} onClick={() => { }}>Spara Inställningar</Button>
            </EvamTabPanel>
        </div>
    )
}