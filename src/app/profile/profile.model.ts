export interface Profile {
  achievement_points: number;
  faction: Faction;
  side: 'H' | 'A';
  race: string;
  class: string;
}

export interface Faction {
  name: any;
  type: 'HORDE' | 'ALLIANCE';
}

export interface ProfileMedia {
  avatar_url: string;
}
