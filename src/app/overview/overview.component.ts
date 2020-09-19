import { Component } from '@angular/core';
import { AchievementService } from '../achievements/achievement.service';
import { Observable } from 'rxjs';
import { AchievementSummary } from '../achievements/achievement';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {

  achievementSummary$: Observable<AchievementSummary>;

  constructor(private achievementService: AchievementService) {
    this.achievementSummary$ = this.achievementService.achievementSummary$();
  }
}
