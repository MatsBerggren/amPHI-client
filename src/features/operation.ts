import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import { EvamApi, Operation, VehicleState, VehicleStatus, Location, TripLocationHistory, RakelState, OperationState } from "@evam-life/sdk";

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
    setTimeout(() => {
      const vehicleLocation = Location.fromJSON({
        timestamp: 1706867152,
        latitude: 57.6775016,
        longitude: 14.0878393,
      });
      const vehicleStatusList: VehicleStatus[] = [
        {
          name: "Uppdrag",
          event: "Uppdrag",
          successorName: "Ank Hämtpl",
          isStartStatus: true,
          isEndStatus: false,
          categoryType: "mission",
          categoryName: "mission",
        },
        {
          name: "Ank Hämtpl",
          event: "Ank Hämtpl",
          successorName: "Avf Hämtpl",
          isStartStatus: false,
          isEndStatus: false,
          categoryType: "mission",
          categoryName: "mission",
        },
        {
          name: "Avf Hämtpl",
          event: "Avf Hämtpl",
          successorName: "Ank Dest",
          isStartStatus: false,
          isEndStatus: false,
          categoryType: "mission",
          categoryName: "mission",
        },
        {
          name: "Ank Dest",
          event: "Ank Dest",
          successorName: "Klar Uppdrag",
          isStartStatus: false,
          isEndStatus: false,
          categoryType: "mission",
          categoryName: "mission",
        },
        {
          name: "Klar Uppdrag",
          event: "Klar Uppdrag",
          successorName: "",
          isStartStatus: false,
          isEndStatus: false,
          categoryType: "mission",
          categoryName: "mission",
        },
        {
          name: "Klar Uppdrag",
          event: "Klar Uppdrag",
          successorName: "",
          isStartStatus: false,
          isEndStatus: false,
          categoryType: "mission",
          categoryName: "mission",
        },
        {
          name: "Passning",
          event: "Passning",
          successorName: "Klar Uppdrag",
          isStartStatus: false,
          isEndStatus: true,
          categoryType: "other",
          categoryName: "SOS",
        },
      ];
      const vehicleStatus = vehicleStatusList[2];
      const operation = Operation.fromJSON({
        operationID: "5",
        patientName: "Test Testman",
        operationState: OperationState.ACTIVE,
        patientUID: "1910101010-1010",
        callCenterId: "1",
        caseFolderId: "1234567890",
        transmitterCode: "370002",
        alarmCategory: "Trafikolycka",
        availablePriorities: [
          { id: 1, name: "PRIO 1" },
          { id: 2, name: "PRIO 2" },
          { id: 3, name: "PRIO 3" },
        ],
        selectedPriority: 1,
        leavePatientLocation: {
          latitude: 57.6535842,
          longitude: 14.0679929,
          street: "Krokusvägen 3",
          locality: "Falun",
          municipality: "Falun",
          routeDirections: "I Plåtskjulet",
          leaveTime: "kl 16:30",
        },
        availableHospitalLocations: [
          {
            id: 1,
            name: "Länssjukhuset Ryhov",
            latitude: 57.7664914,
            longitude: 14.1918686,
          },
          {
            id: 2,
            name: "Värnamo Sjukhus",
            latitude: 57.1746065,
            longitude: 14.0257794,
          },
        ],
        caseInfo: "Trafikolycka, bil krockat med moped",
        selectedHospital: "",
        vehicleStatus: vehicleStatus,
        radioGroupMain: "240-1-9230022",
        radioGroupSecondary: "240-1-9888565",
        destinationSiteLocation: {
          latitude: 57.65294,
          longitude: 14.06855,
          street: "Storgatan 3",
          locality: "Falun",
          municipality: "Falun",
          routeDirections: "Rakt fram",
        },
        name: "Test operation",
        sendTime: new Date().getTime() - 5 * 1000 * 60,
        createdTime: new Date().getTime() - 10 * 1000 * 60,
        acceptedTime: new Date().getTime(),
      });

      evam.injectOperation(operation);
      evam.injectVehicleState(
        VehicleState.fromJSON({
          timestamp: new Date(),
          activeCaseFullId: operation.getFullId(),
          vehicleLocation: vehicleLocation,
          vehicleStatus: vehicleStatus,
        })
      );

      evam.injectAvailableVehicleStatusList(vehicleStatusList);
      evam.injectTrip(
        TripLocationHistory.fromJSON({
          locationHistory: [],
          etaSeconds: 300,
          distanceToDestinationMeters: 1700,
        })
      );
      evam.injectRakelState(
        RakelState.fromJSON({
          msisdn: "3319110",
          issi: "331911",
          gssi: "331912",
        })
      );
    }, 5000);
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