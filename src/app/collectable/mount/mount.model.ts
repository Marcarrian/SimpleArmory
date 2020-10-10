import { Category, Item } from '../../shared/model/category';

export interface MountSummary {
  // mounts: MountCollected[];
  collection?: Map<number, MountCollected>;
  totalCollected: number;
  totalPossible: number;
  isAlliance?: boolean;
  categories?: Category[];
  collected: Item[];
  possible: Item[];
}

export interface MountCollection {
  mounts: MountCollected[];
}

export interface MountCollected {
  is_useable: boolean;
  mount: Mount;
}

export interface Mount {
  id: number;
  name: any;
}

export interface Quality {
  type: string;
}

export interface Stats {
  breed_id: number;
}
