import { EvamTabPanel } from "@evam-life/sdk/sdk/component/appbar/EvamTabPanel";
import MethaneReport from "../components/MethaneReport";
import Status from "../components/Status";

export function MainView() {
    return (
        <div>
            <EvamTabPanel index={0}>
                <Status />
            </EvamTabPanel>
            <EvamTabPanel index={1}>
                <MethaneReport />
            </EvamTabPanel>
        </div>
    )
}