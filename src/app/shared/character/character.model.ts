export interface Character {
  region: string;
  realm: string;
  name: string;
  guild?: Guild;
}

export interface Guild {
  name: string;
}
