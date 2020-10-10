import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CharacterService } from '../../shared/character/character.service';
import { combineLatest, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { armorystatsUrl } from '../../util/constants';
import { Pet, PetCollection, PetSummary } from './pets';
import { ProfileService } from '../../profile/profile.service';
import BattlepetsJson from '../../../assets/data/battlepets.json';
import { Category, Item, Subcategory } from '../../shared/model/category';
import { Character } from '../../shared/character/character.model';
import { Profile } from '../../profile/profile.model';

@Injectable({
  providedIn: 'root',
})
export class BattlepetService {

  // issues/53: Pets that we can ignore warning for because they are battle pets
  private ignoredFoundPets = {
    10708: true,
    132785: true,
    148065: true,
    148068: true,
    148069: true,
  };

  constructor(private http: HttpClient,
              private characterService: CharacterService,
              private profileService: ProfileService) {

  }

  public battlepetSummary$(): Observable<PetSummary> {
    const collectedPetsByCharacter$ = this.characterService.character$
      .pipe(switchMap(character => this.collectedPets$(character)));
    return combineLatest([
      collectedPetsByCharacter$,
      this.profileService.profile$,
    ]).pipe(
      switchMap(([collectedPets, profile]) => this.createPetSummary$(collectedPets, profile)),
    );
  }

  public collectedPets$(character: Character): Observable<PetCollection> {
    return this.http.get<PetCollection>(`${armorystatsUrl}${character.region}/${character.realm}/${character.name}/collections/pets`);
  }

  private createPetSummary$(collectedPets: PetCollection, profile: Profile): Observable<PetSummary> {
    const isAlliance = profile.faction.type === 'ALLIANCE';
    const petSummary: PetSummary = {
      collection: new Map<number, Pet>(),
      totalCollected: 0,
      totalPossible: 0,
      categories: [],
      collected: [],
      possible: [],
      isAlliance,
    };

    collectedPets.pets.forEach(petCollected => petSummary.collection.set(+petCollected.species.id, petCollected));

    BattlepetsJson.forEach((category: any) => {
      const cat: Category = {name: category.name, subcats: []};
      petSummary.categories.push(cat);

      category.subcats.forEach((subcategory: Subcategory) => {
          const subcat: Subcategory = {name: subcategory.name, items: []};

          subcategory.items.forEach((item: Item) => {
            const itm: Item = {...item};
            itm.link = this.determineItemLink(item, profile);

            if (petSummary.collection.get(+itm.ID)) {
              itm.collected = true;
            } // TODO if we dont have the mount then it surely can never show up as collected ye?

            // What would cause it to show up in the UI:
            //    1) You have the item
            //    2) Its still obtainable
            //    3) You meet the class restriction
            //    4) You meet the race restriction
            const isPetCollected = itm.collected;
            let shouldShowPet = (isPetCollected || !item.notObtainable);

            if (!this.allowedFactionOnItemMatchesProfileFaction(item, profile)) {
              shouldShowPet = false;
            }

            if (!this.allowedRaceOnItemMatchesProfileRace(item, profile)) {
              shouldShowPet = false;
            }

            if (!this.allowedClassOnItemMatchesProfileClass(item, profile)) {
              shouldShowPet = false;
            }

            if (shouldShowPet) {
              subcat.items.push(itm);
              if (isPetCollected) {
                petSummary.totalCollected++;
                petSummary.collected.push(itm);
              }
              petSummary.totalPossible++;
            }
          });

          if (subcat.items.length > 0) {
            cat.subcats.push(subcat);
          }
        },
      );
    });
    return of(petSummary);
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
