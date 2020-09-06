import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { anchorTarget, wowHeadUrl } from '../util/constants';
import { Category } from '../model/category';
import { AchievementsService } from './achievements.service';
import { AchievementSummary } from './achievement';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
})
export class AchievementsComponent {

  wowHeadUrl = wowHeadUrl;
  anchorTarget = anchorTarget;
  superCategory: string;
  category: Category;
  achievements: any;

  achievementSummary: AchievementSummary;

  constructor(activatedRoute: ActivatedRoute, private achievementService: AchievementsService) {
    activatedRoute.data.pipe(
      concatMap(data => this.achievementService.achievementSummary$(data.character)),
    ).subscribe(achievementSummary => {
      console.log(achievementSummary);
      return this.achievementSummary = achievementSummary;
    });

    this.superCategory = this.prettySuperCategory(this.category);
    // get achieves

    // AchievementsService.getAchievements().then(function (achievements) {
    //   $scope.achievements = achievements[$scope.superCat];
    // });
  }

  getImageSrc(achievement): string {
    if (achievement.id === '8468' && achievement.completed) {
      // special case galakras since its busted on wowhead
      return 'images/galakras.png';
    }
    else if (achievement.id === '9552' && achievement.completed) {
      // special case falling down since its busted on wowhead
      return 'images/spell_fel_incinerate.jpg';
    }
    else if (achievement.completed) {
      // wowhead img
      return '//wow.zamimg.com/images/wow/icons/medium/' + achievement.icon.toLowerCase() + '.jpg';
    }
    else {
      // 1x1 gif
      return 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
    }
  }

  border(achievement): string {
    if (achievement.completed) {
      return 'borderOff';
    }
    else {
      return 'borderOn';
    }
  }

  // Maps url simplified name into the pretty name and the name we hash off of in the json
  prettySuperCategory(supercat): string {
    let prettyCatName = supercat;

    switch (supercat) {
      case 'character':
        prettyCatName = 'Character';
        break;
      case 'quests':
        prettyCatName = 'Quests';
        break;
      case 'exploration':
        prettyCatName = 'Exploration';
        break;
      case 'pvp':
        prettyCatName = 'Player vs. Player';
        break;
      case 'dungeons':
        prettyCatName = 'Dungeons & Raids';
        break;
      case 'professions':
        prettyCatName = 'Professions';
        break;
      case 'reputation':
        prettyCatName = 'Reputation';
        break;
      case 'events':
        prettyCatName = 'World Events';
        break;
      case 'pets':
        prettyCatName = 'Pet Battles';
        break;
      case 'collections':
        prettyCatName = 'Collections';
        break;
      case 'expansions':
        prettyCatName = 'Expansion Features';
        break;
      case 'legacy':
        prettyCatName = 'Legacy';
        break;
      case 'feats':
        prettyCatName = 'Feats of Strength';
        break;
    }
    return prettyCatName;
  }
}
