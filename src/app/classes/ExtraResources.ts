interface IExtraResources {
  ambulances: number;
  chemical_suit: number;
  commander_unit: number;
  doctor_on_duty: number;
  emergency_wagon: number;
  helicopter: number;
  medical_team: number;
  medical_transport: number;
  PAM: number;
  sanitation_wagon: number;
  transport_ambulance: number;
  units_total: number;
}

class ExtraResources implements IExtraResources {
  constructor(
    public ambulances: number,
    public chemical_suit: number,
    public commander_unit: number,
    public doctor_on_duty: number,
    public emergency_wagon: number,
    public helicopter: number,
    public medical_team: number,
    public medical_transport: number,
    public PAM: number,
    public sanitation_wagon: number,
    public transport_ambulance: number,
    public units_total: number
  ) {}
}

export default ExtraResources;