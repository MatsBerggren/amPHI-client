import AccessRoad from "./AccessRoad";
import ExtraResources from "./ExtraResources";
import InventoryLevel from "./InventoryLevel";
import Position from "./Position";

interface IMethane {
  access_road: AccessRoad;           //Ankomstväg hinder
  created: string;                  //Skapad
  exact_location: string;            //Exakt plats
  extra_resources: ExtraResources;   //Extra resurser
  hazards: string[];                //Risker
  inventory_level: InventoryLevel;   //
  last_updated: string;              //Senast uppdaterad
  major_incident: boolean;           //Större händelse
  numbers_affected_green: number;     //Antal drabbade grönt
  numbers_affected_red: number;       //Antal drabbade rött
  numbers_affected_yellow: number;    //Antal drabbade gult
  position: Position;               //Position
  special_injuries: string;          //Särskilda skador
  time_first_departure: string;       //Tid första utryckning
  types: string[];                  //Typ av händelse
}

class Methane implements IMethane {
  constructor(
    public access_road: AccessRoad,
    public created: string,
    public exact_location: string,
    public extra_resources: ExtraResources,
    public hazards: string[],
    public inventory_level: InventoryLevel,
    public last_updated: string,
    public major_incident: boolean,
    public numbers_affected_green: number,
    public numbers_affected_red: number,
    public numbers_affected_yellow: number,
    public position: Position,
    public special_injuries: string,
    public time_first_departure: string,
    public types: string[]
  ) {}
}


export default Methane;


