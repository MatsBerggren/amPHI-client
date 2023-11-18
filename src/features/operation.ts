import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import { EvamApi, Operation } from "@evam-life/sdk";
import OperationState from "@evam-life/sdk/sdk/domain/OperationState";

interface ActiveOperationState {
    value: Operation | undefined
}

const initialState: ActiveOperationState = {
    value: undefined
}

const evam = new EvamApi()

if (!EvamApi.isRunningInVehicleServices) {
    // We are not running in Vehicle Services, so we inject a pre-defined Operation
    // after a few seconds to simulate a new Operation being received from Rakel.
    setTimeout(
        () => {
            evam.injectSettings(
                { debug: true }
            )
        }, 3000
    )
    // Simulate the reception of an active case 5s after the app starts
    setTimeout(
        () => {
            evam.injectOperation(Operation.fromJSON(
                {
                    operationID: "56",
                    patientName: "Torsten Test",
                    operationState: OperationState.ACTIVE,
                    patientUID: "19750705-1234",
                    callCenterId: "18",
                    caseFolderId: "1",
                    prio: "PRIO 1",
                    alarmCategory: "Trafikolycka",
                    additionalInfo: "Trafikolycka, bil krockat med moped",
                    vehicleStatus: {
                        name: "311 9630",
                        event: undefined,
                        successorName: undefined,
                        isStartStatus: false,
                        isEndStatus: false,
                        categoryType: "other",
                        categoryName: "test",
                    },
                    destinationSiteLocation: {
                        latitude: 59.35393,
                        longitude: 17.973795,
                        street: "Fogdemyrsgatan 3"
                    },
                    name: "Trafikolycka",
                    sendTime: (new Date()).getTime() - 1000 * 60 * 10,
                    createdTime: (new Date()).getTime() - 1000 * 60 * 10,
                }
            ))
        }, 5000
    )
    setTimeout(
        () => {
            evam.injectOperation(Operation.fromJSON(
                {
                    operationID: "57",
                    patientName: "Pisse Nisse",
                    operationState: OperationState.ACTIVE,
                    patientUID: "19750705-1235",
                    callCenterId: "18",
                    caseFolderId: "1",
                    prio: "PRIO 1",
                    alarmCategory: "Trafikolycka",
                    additionalInfo: "Trafikolycka, bil krockat med moped",
                    vehicleStatus: {
                        name: "311 9630",
                        event: undefined,
                        successorName: undefined,
                        isStartStatus: false,
                        isEndStatus: false,
                        categoryType: "other",
                        categoryName: "test",
                    },
                    destinationSiteLocation: {
                        latitude: 59.35393,
                        longitude: 17.973795,
                        street: "Fogdemyrsgatan 3"
                    },
                    name: "Trafikolycka",
                    sendTime: (new Date()).getTime() - 1000 * 60 * 10,
                    createdTime: (new Date()).getTime() - 1000 * 60 * 10,
                }
            ))
        }, 10000
    )
    setTimeout(
        () => {
            evam.injectOperation(Operation.fromJSON(
                {
                    operationID: "58",
                    patientName: "Ola Salo",
                    operationState: OperationState.ACTIVE,
                    patientUID: "19750705-1236",
                    callCenterId: "18",
                    caseFolderId: "1",
                    prio: "PRIO 1",
                    alarmCategory: "Trafikolycka",
                    additionalInfo: "Trafikolycka, bil krockat med moped",
                    vehicleStatus: {
                        name: "311 9630",
                        event: undefined,
                        successorName: undefined,
                        isStartStatus: false,
                        isEndStatus: false,
                        categoryType: "other",
                        categoryName: "test",
                    },
                    destinationSiteLocation: {
                        latitude: 59.35393,
                        longitude: 17.973795,
                        street: "Fogdemyrsgatan 3"
                    },
                    name: "Trafikolycka",
                    sendTime: (new Date()).getTime() - 1000 * 60 * 10,
                    createdTime: (new Date()).getTime() - 1000 * 60 * 10,
                }
            ))
        }, 15000
    )
    // You can add more events like the one above here to be run afterward
}

export const activeOperationSlice = createSlice({
    name: "activeOperation",
    initialState,
    reducers: {
        setActiveCase: (state, action: PayloadAction<Operation | undefined>) => {
            state.value = action.payload
        }
    }
})

export const { setActiveCase } = activeOperationSlice.actions

export const selectActiveCase = (state: RootState) => state.activeCase.value

export default activeOperationSlice.reducer