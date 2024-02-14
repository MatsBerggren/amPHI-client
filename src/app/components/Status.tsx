import { useAppSelector } from "../hooks";
import { Typography } from "@mui/material";
import { Fragment } from "react";
import { selectActiveCase } from "../../features/operation";

const Status: React.FC = () => {
    const activeCase = useAppSelector(selectActiveCase)

    return (
        <Fragment>
            <div className="container">
                <Typography variant={"h4"}>Aktivt ärende</Typography>
                <div className="labels">
                    <Typography variant={"body1"}>Aktuellt ärende:</Typography>
                </div>
                <div className="input-tab">
                    <Typography variant={"body1"}>{activeCase ? `${activeCase.name} (${activeCase.getFullId()})` : "Inget aktivt ärende"}</Typography>
                </div>
                <div className="labels">
                    <Typography variant={"body1"}>Beskrivning:</Typography>
                </div>
                <div className="input-tab">
                    <Typography variant={"body1"}>{activeCase ? `${activeCase.additionalInfo}` : ""}</Typography>
                </div>
                <div className="labels">
                    <Typography variant={"body1"}>Skickat:</Typography>
                </div>
                <div className="input-tab">
                    <Typography variant={"body1"}>{activeCase ? `${activeCase.sendTime?.toLocaleString()}` : ""}</Typography>
                </div>
                <div className="labels">
                    <Typography variant={"body1"}>Kategori:</Typography>
                </div>
                <div className="input-tab">
                    <Typography variant={"body1"}>{activeCase ? `${activeCase.alarmCategory}` : ""}</Typography>
                </div>
                <div className="labels">
                    <Typography variant={"body1"}>Patient:</Typography>
                </div>
                <div className="input-tab">
                    <Typography variant={"body1"}>{activeCase ? `${activeCase.patientName} (${activeCase.patientUID})` : ""}</Typography>
                </div>
                <div className="labels">
                    <Typography variant={"body1"}>Ambulans namn:</Typography>
                </div>
                <div className="input-tab">
                    <Typography variant={"body1"}>{activeCase ? `${activeCase.vehicleStatus?.name}` : ""}</Typography>
                </div>
                <div className="labels">
                    <Typography variant={"body1"}>Destination:</Typography>
                </div>
                <div className="input-tab">
                    <Typography variant={"body1"}>{activeCase ? `${activeCase.destinationSiteLocation?.street}` : ""}</Typography>
                </div>
                <div className="labels">
                    <Typography variant={"body1"}>amPHI Status:</Typography>
                </div>
                <div className="input-tab">
                    <Typography variant={"body1"}>Ansluten</Typography>
                </div>
                <div className="labels">
                    <Typography variant={"body1"}>Valt sjukhus:</Typography>
                </div>
                <div className="input-tab">
                    <Typography variant={"body1"}>Sunderby sjukhus</Typography>
                </div>
                <div className="labels">
                    <Typography variant={"body1"}>Ärende status:</Typography>
                </div>
                <div className="input-tab">
                    <Typography variant={"body1"}>{activeCase ? `${activeCase.operationState}` : ""}</Typography>
                </div>
            </div>
        </Fragment>
    );
};

export default Status;