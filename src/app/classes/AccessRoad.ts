interface IAccessRoad {
  comment: string;
  is_obstructed: boolean;
}

class AccessRoad implements IAccessRoad {
  constructor(
    public comment: string, 
    public is_obstructed: boolean
    ) {}
}

export default AccessRoad;