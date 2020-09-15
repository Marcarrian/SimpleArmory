import { Injectable } from '@angular/core';
import { Character } from '../character/character';
import { combineLatest, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AchievementCatJson, AchievementItemJson, AchievementSubcatJson, AchievementSummary, AchievementSummaryCategory, AchievementSummarySubCategory, AchievementSummarySuperCategory, AchievementSupercatJson, ArmorystatsAchievement, ArmorystatsAchievementChildCriteria, ArmorystatsAchievementResponse, MyAchievement } from './achievement';
import { switchMap } from 'rxjs/operators';
import { ProfileService } from '../profile/profile.service';
import AchievementsJson from '../../assets/data/achievements.json';
import { armorystatsUrl } from '../util/constants';
import { Profile } from '../profile/profile';
import { CharacterService } from '../character/character.service';

@Injectable({
  providedIn: 'root',
})
export class AchievementsService {

  fakeCompletionTime = 312;

  // ignore achievements that shouldn't show up in the UI
  ignoredFoundAchievements = {
    10050: true, // learn a primary prof
    10051: true,  // learn two primary prof
  };

  constructor(private http: HttpClient,
              private profileService: ProfileService,
              private characterService: CharacterService) {
  }

  public achievementSummary$(): Observable<AchievementSummary> {
    const earnedAchievementsByCharacter$ = this.characterService.character$
      .pipe(
        switchMap(character => this.earnedAchievements$(character)),
      );

    return combineLatest([
      earnedAchievementsByCharacter$,
      this.profileService.profile$,
    ]).pipe(
      switchMap(([earnedAchievements, profile]) => this.createAchievementSummary$(earnedAchievements, profile)),
    );
  }

  public earnedAchievements$(character: Character): Observable<ArmorystatsAchievementResponse> {
    return this.http.get<ArmorystatsAchievementResponse>(`${armorystatsUrl}${character.region}/${character.realm}/${character.name}/achievements`);
  }

  public createAchievementSummary$(
    armorystatsAchievementResponse: ArmorystatsAchievementResponse,
    profile: Profile): Observable<AchievementSummary> {
    const achievementSummary: AchievementSummary = {
      supercategories: new Map<string, AchievementSummarySuperCategory>(),
      possible: 0,
      completed: 0,
    };
    const completedAchievements = new Map<number, number>();
    const fulfilledCriteria = new Map<string, boolean>();
    const found = new Map<number, boolean>();
    let totalFeatsOfStrength = 0;
    let totalLegacy = 0;

    // Build up lookup for achievements that character has completed
    armorystatsAchievementResponse.achievements.forEach((armorystatsAchievement: ArmorystatsAchievement) => {
      if (armorystatsAchievement.completed_timestamp) {
        completedAchievements.set(armorystatsAchievement.id, armorystatsAchievement.completed_timestamp);
      }

      if (armorystatsAchievement.criteria?.is_completed) {
        fulfilledCriteria.set('' + armorystatsAchievement.criteria.id, true);
      }

      armorystatsAchievement.criteria?.child_criteria?.forEach((childCriteria: ArmorystatsAchievementChildCriteria) => {
        if (childCriteria.is_completed) {
          fulfilledCriteria.set('' + childCriteria.id, true);
        }
      });
    });

    AchievementsJson.supercats.forEach((supercat: AchievementSupercatJson) => {
      let possibleCount = 0;
      let completedCount = 0;

      const mySupercat: AchievementSummarySuperCategory = {name: supercat.name, categories: []};

      supercat.cats.forEach((cat: AchievementCatJson) => {
        const myCat: AchievementSummaryCategory = {name: cat.name, subcats: []};

        cat.subcats.forEach((subcat: AchievementSubcatJson) => {
          const mySubCat: AchievementSummarySubCategory = {name: subcat.name, achievements: []};

          subcat.items.forEach((achievementJson: AchievementItemJson) => {
            found.set(+achievementJson.id, true);

            const myAchievement: MyAchievement = achievementJson;
            let added = false;

            myAchievement.completed = completedAchievements.get(+achievementJson.id);

            // TODO debug option?
            // Hack: until blizz fixes api, don't stamp with date
            if (myAchievement.completed && myAchievement.completed !== this.fakeCompletionTime) {
              myAchievement.rel = 'who=' + name + '&when=' + myAchievement.completed;
            }

            if (myAchievement.completed) {
              added = true;
              mySubCat.achievements.push(myAchievement);

              // if this is feats of strength then I want to keep a seperate count for that
              // since its not a percentage thing
              if (supercat.name === 'Feats of Strength') {
                totalFeatsOfStrength++;
              }
              else if (supercat.name === 'Legacy') {
                totalLegacy++;
              }
            }
            else if (achievementJson.criteria) {
              // build up rel based on completed criteria for the achievement
              // and pass that along to wowhead
              // cri=40635:40636:40637:40638:40640:40641:40642:40643:40644:40645
              // TODO "criCom"??
              // const criCom: string[] = [];
              // achievementJson.criteria.forEach((wowheadCriteria, blizzardCriteria) => {
              //   if (fulfilledCriteria.get(blizzardCriteria)) {
              //     criCom.push(wowheadCriteria);
              //   }
              // });
              //
              // if (criCom.length > 0) {
              //   myAchievement.rel = 'cri=' + criCom.join(':');
              // }
            }

            // Update counts proper
            if (supercat.name !== 'Feats of Strength' && supercat.name !== 'Legacy' && !achievementJson.notObtainable &&
              (!achievementJson.side || achievementJson.side === profile.side)) {
              possibleCount++;
              achievementSummary.possible++;

              if (myAchievement.completed) {
                completedCount++;
                achievementSummary.completed++;
              }

              // if we haven't already added it, then this is one that should show up in the page of achievements
              // so add it
              if (!added) {
                mySubCat.achievements.push(myAchievement);
              }
            }
          });

          if (mySubCat.achievements.length > 0) {
            myCat.subcats.push(mySubCat);
          }
        });

        mySupercat.categories.push(myCat);
      });

      achievementSummary.supercategories.set(mySupercat.name, mySupercat);
    });

    return of(achievementSummary);
  }
}
