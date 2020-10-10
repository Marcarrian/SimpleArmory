import { Category, Item } from '../../shared/model/category';

type Quality = 'POOR' | 'UNCOMMON';

export interface PetSummary {
  collection?: Map<number, Pet>;
  totalCollected?: number;
  totalPossible?: number;
  isAlliance?: boolean;
  categories?: Category[];
  collected?: Item[];
  possible?: Item[];
}

export interface PetCollection {
  pets: Pet[];
}

export interface Pet {
  id: number;
  level?: string;
  species?: Species;
  quality?: Quality;
  stats?: Stats;
}

export interface Species {
  id: string;
  name?: any;
}

export interface Stats {
  breed_id: number;
  health: number;
  power: number;
  speed: number;
}
