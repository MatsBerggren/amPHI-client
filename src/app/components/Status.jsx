import { useAppSelector } from "../hooks";
import { Button, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import { EvamApi, Notification, NotificationType } from "@evam-life/sdk";
import { selectActiveCase } from "../../features/operation";

const Status = () => {
    const activeCase = useAppSelector(selectActiveCase)

    return (
        <Fragment>
            <div className="container">
                <Typography variant={"h4"}>Activt ärende</Typography>
                <div className="labels">
                    <Typography variant={"body1"}>Aktuellt ärende:</Typography>
                </div>
                <div className="input-tab">
                    <Typography variant={"body1"}>{activeCase ? `${activeCase.name} (${activeCase.getFullId()})` : "Inget aktivt ärende"}</Typography>
                </div>
                <div className="labels">
                    <Typography variant={"body1"}>Skickat:</Typography>
                </div>
                <div className="input-tab">
                    <Typography variant={"body1"}>{activeCase ? `${activeCase.sendTime.toLocaleString()}` : ""}</Typography>
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
                    <Typography variant={"body1"}>{activeCase ? `${activeCase.vehicleStatus.name}` : ""}</Typography>
                </div>
                <div className="labels">
                    <Typography variant={"body1"}>Destination:</Typography>
                </div>
                <div className="input-tab">
                    <Typography variant={"body1"}>{activeCase ? `${activeCase.destinationSiteLocation.street}` : ""}</Typography>
                </div>
                <div className="labels">
                    <Typography variant={"body1"}>Tillgängliga sjukhus:</Typography>
                </div>
                <div className="input-tab">
                    <Typography variant={"body1"}>{activeCase ? `${activeCase.availableHospitalLocations}` : ""}</Typography>
                </div>
                <div className="labels">
                    <Typography variant={"body1"}>Valt sjukhus:</Typography>
                </div>
                <div className="input-tab">
                    <Typography variant={"body1"}>{activeCase ? `${activeCase.availableHospitalLocations}` : ""}</Typography>
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