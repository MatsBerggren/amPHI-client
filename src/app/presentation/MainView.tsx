import { EvamTabPanel } from "@evam-life/sdk/sdk/component/appbar/EvamTabPanel";
import MethaneReport from "../components/MethaneReport";

export function MainView() {
    return (
        <div>
            <EvamTabPanel index={0}>
                <MethaneReport />
            </EvamTabPanel>
        </div>
    )
}