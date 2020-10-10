import { MyAchievement } from '../../achievements/achievement';

export interface Category {
  id?: string;
  name?: string;
  subcats?: Subcategory[];
}

export interface Subcategory {
  id?: string;
  name?: string;
  items?: Item[];
  achievements?: MyAchievement[];
}

export interface Item { // TODO mountItem? nvm any item
// potential item attributes
// quality?: Quality;
// level?: number;
// stats?: Stats;

  ID?: string;
  id?: string;
  icon?: string;
  itemId?: number;
  spellid?: number;
  link?: string;
  side?: string;
  allianceId?: string;
  hordeId?: string;
  creatureId?: string;
  collected?: boolean;
  notObtainable?: boolean;
  allowableRaces?: string[];
  allowableClasses?: string[];
  criteria: Map<number, string>;
}
