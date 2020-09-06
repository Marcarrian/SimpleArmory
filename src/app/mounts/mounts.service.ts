import { Injectable } from '@angular/core';
import { Character } from '../character/character';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, of } from 'rxjs';
import { ProfileService } from '../login/profile.service';
import MountsJson from '../../assets/data/mounts.json';
import { Category, Item, Subcategory } from '../model/category';
import { armorystatsUrl } from '../util/constants';
import { switchMap } from 'rxjs/operators';
import { CharacterService } from '../character/character.service';
import { Profile } from '../login/profile';

@Injectable({
  providedIn: 'root',
})
export class MountsService {

  constructor(private http: HttpClient,
              private profileService: ProfileService,
              private characterService: CharacterService) {
  }

  public mountSummary$(): Observable<MountSummary> {
    const collectedMountsByCharacter$ = this.characterService.character$.pipe(
      switchMap(character => this.collectedMounts$(character)),
    );
    return combineLatest([
      collectedMountsByCharacter$,
      this.profileService.profile$,
    ]).pipe(
      switchMap(([collectedMounts, profile]) => this.createMountSummary$(collectedMounts, profile)),
    );
  }

  private collectedMounts$(character: Character): Observable<MountCollection> {
    return this.http.get<MountCollection>(`${armorystatsUrl}${character.region}/${character.realm}/${character.name}/collections/mounts`);
  }

  private createMountSummary$(collectedMounts: MountCollection, profile: Profile): Observable<MountSummary> {
    const isAlliance = profile.faction.type === 'ALLIANCE';
    const mountSummary: MountSummary = {
      collection: new Map<number, MountCollected>(),
      totalCollected: 0,
      totalPossible: 0,
      categories: [],
      collected: [],
      possible: [],
      isAlliance,
    };

    collectedMounts.mounts.forEach(mountCollected => mountSummary.collection.set(mountCollected.mount.id, mountCollected));

    MountsJson.forEach((category: any) => {
      const cat: Category = {name: category.name, subcats: []};
      mountSummary.categories.push(cat);

      category.subcats.forEach((subcategory: Subcategory) => {
          const subcat: Subcategory = {name: subcategory.name, items: []};

          subcategory.items.forEach((item: Item) => {
            const itm: Item = {...item};
            itm.link = this.determineItemLink(item, profile);

            if (mountSummary.collection.get(+itm.ID)) {
              itm.collected = true;
            } // TODO if we dont have the mount then it surely can never show up as collected ye?

            // What would cause it to show up in the UI:
            //    1) You have the item
            //    2) Its still obtainable
            //    3) You meet the class restriction
            //    4) You meet the race restriction
            const isMountCollected = itm.collected;
            let shouldShowMount = (isMountCollected || !item.notObtainable);

            if (!this.allowedFactionOnItemMatchesProfileFaction(item, profile)) {
              shouldShowMount = false;
            }

            if (!this.allowedRaceOnItemMatchesProfileRace(item, profile)) {
              shouldShowMount = false;
            }

            if (!this.allowedClassOnItemMatchesProfileClass(item, profile)) {
              shouldShowMount = false;
            }

            if (shouldShowMount) {
              subcat.items.push(itm);
              if (isMountCollected) {
                mountSummary.totalCollected++;
                mountSummary.collected.push(itm);
              }
              mountSummary.totalPossible++;
            }
          });

          if (subcat.items.length > 0) {
            cat.subcats.push(subcat);
          }
        },
      );
    });
    return of(mountSummary);
  }

  private determineItemLink(item: Item, profile: Profile): string {
    // Need to do some extra work to determine what our url should be
    // By default we'll use a spell id
    let link = 'spell=' + item.spellid;

    // If the item id is available lets use that
    if (item.itemId) {
      link = 'item=' + item.itemId;
    }
    else if (item.allianceId && (profile.faction.type === 'ALLIANCE')) {
      link = 'item=' + item.allianceId;
    }
    else if (item.hordeId && (profile.faction.type === 'HORDE')) {
      link = 'item=' + item.hordeId;
    }
    else if (item.creatureId) {
      link = 'npc=' + item.creatureId;
    }

    return link;
  }

  private allowedFactionOnItemMatchesProfileFaction(item: Item, profile: Profile): boolean {
    if (!item.side) {
      return true;
    }
    return item.side === profile.side;
  }

  private allowedRaceOnItemMatchesProfileRace(item: Item, profile: Profile): boolean {
    if (!item.allowableRaces) {
      return true;
    }
    return item.allowableRaces.find(allowableRace => allowableRace === profile.race) !== undefined;
  }

  private allowedClassOnItemMatchesProfileClass(item: Item, profile: Profile): boolean {
    if (!item.allowableClasses) {
      return true;
    }
    return item.allowableClasses.find(allowableClass => allowableClass === profile.class) !== undefined;
  }
}

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
