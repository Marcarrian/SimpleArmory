import { Component, Inject } from '@angular/core';
import { anchorTarget } from '../util/constants';
import { AchievementsService } from './achievements.service';
import { AchievementSummary } from './achievement';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { WOWHEAD_URL } from '../shared/wowhead-url';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss'],
})
export class AchievementsComponent {

  anchorTarget = anchorTarget;
  superCategoryAcronym: string;
  prettySupercategory: string;

  achievementSummary$: Observable<AchievementSummary>;

  constructor(private achievementService: AchievementsService,
              route: ActivatedRoute,
              @Inject(WOWHEAD_URL) public wowheadUrl) {
    route.paramMap.subscribe(params => {
      this.superCategoryAcronym = params.get('category');
      this.prettySupercategory = this.prettifySupercategory(this.superCategoryAcronym);
    });
    this.achievementSummary$ = this.achievementService.achievementSummary$();
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
  private prettifySupercategory(acronym: string): string {
    let prettyCategory = acronym;

    switch (acronym) {
      case 'character':
        prettyCategory = 'Character';
        break;
      case 'quests':
        prettyCategory = 'Quests';
        break;
      case 'exploration':
        prettyCategory = 'Exploration';
        break;
      case 'pvp':
        prettyCategory = 'Player vs. Player';
        break;
      case 'dungeons':
        prettyCategory = 'Dungeons & Raids';
        break;
      case 'professions':
        prettyCategory = 'Professions';
        break;
      case 'reputation':
        prettyCategory = 'Reputation';
        break;
      case 'events':
        prettyCategory = 'World Events';
        break;
      case 'pets':
        prettyCategory = 'Pet Battles';
        break;
      case 'collections':
        prettyCategory = 'Collections';
        break;
      case 'expansions':
        prettyCategory = 'Expansion Features';
        break;
      case 'legacy':
        prettyCategory = 'Legacy';
        break;
      case 'feats':
        prettyCategory = 'Feats of Strength';
        break;
    }
    return prettyCategory;
  }
}
