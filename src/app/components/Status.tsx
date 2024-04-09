import { useAppSelector } from "../hooks";
import { Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { selectActiveCase } from "../../features/operation";
import { EvamApi } from "@evam-life/sdk";

const evam = new EvamApi();

const LabelInputTab: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <>
        <div className="labels">
            <Typography variant={"body1"}>{label}</Typography>
        </div>
        <div className="input-tab">
            <Typography variant={"body1"}>{value}</Typography>
        </div>
    </>
);

const Status: React.FC = () => {
    const activeCase = useAppSelector(selectActiveCase)
    const [heartbeat, setHeartbeat] = useState(evam.store.get("hartbeat"));

    useEffect(() => {
        const interval = setInterval(() => {
            setHeartbeat(evam.store.get("hartbeat"));
        }, 5000); // Update every 5 seconds

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

    return (
        <Fragment>
            <div className="container">
                <Typography variant={"h4"}>Aktivt ärende</Typography>
                <LabelInputTab label="Aktuellt ärende:" value={activeCase ? `${activeCase.name} (${activeCase.getFullId()})` : "Inget aktivt ärende"} />
                <LabelInputTab label="Beskrivning:" value={activeCase ? `${activeCase.additionalInfo}` : ""} />
                <LabelInputTab label="Skickat:" value={activeCase ? `${activeCase.sendTime?.toLocaleString()}` : ""} />
                <LabelInputTab label="Kategori:" value={activeCase ? `${activeCase.alarmCategory}` : ""} />
                <LabelInputTab label="Patient:" value={activeCase ? `${activeCase.patientName} (${activeCase.patientUID})` : ""} />
                <LabelInputTab label="Ambulans namn:" value={activeCase ? `${activeCase.vehicleStatus?.name}` : ""} />
                <LabelInputTab label="Destination:" value={activeCase ? `${activeCase.destinationSiteLocation?.street}` : ""} />
                <LabelInputTab label="Valt sjukhus:" value={activeCase ? `${activeCase.selectedHospital}` : ""} />
                <LabelInputTab label="Ärende status:" value={activeCase ? `${activeCase.operationState}` : ""} />
                <LabelInputTab label="Förbindelse amPHI:" value={heartbeat} />
            </div>
        </Fragment>
    );
};

export default Status;