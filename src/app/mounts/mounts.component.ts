import { Component, OnDestroy } from '@angular/core';
import { MountsService, MountSummary } from './mounts.service';
import { ApplicationService } from '../application/application.service';
import { wowHeadUrl } from '../util/constants';
import { Observable, Subject } from 'rxjs';
import { Profile, ProfileService } from '../login/profile.service';

@Component({
  selector: 'app-mounts',
  templateUrl: './mounts.component.html',
  styleUrls: ['./mounts.component.scss'],
})
export class MountsComponent implements OnDestroy {

  wowHeadUrl = wowHeadUrl;
  mountSummary$: Observable<MountSummary>;
  profile$: Observable<Profile>;
  showPlanner = false;
  plannerReturned = false;
  planner = [];
  destroy$ = new Subject<void>();

  constructor(private mountsService: MountsService,
              public applicationService: ApplicationService,
              private profileService: ProfileService) {
    this.mountSummary$ = this.mountsService.mountSummary$();
    this.profile$ = profileService.profile$;
  }

  // called when planner checkbox is clicked
  plannerChanged(): void {
    if (this.showPlanner) {
      // $window.ga('send', 'pageview', 'Planner');

      // this.plannerService.getSteps(this.items).then(function (steps) {
      //   this.plannerReturned = true;
      //   this.planner = steps;
      // });
    }
  }

  // anchor css used for planner checkbox
  anchorCss(boss): string {
    if (boss.epic) {
      return 'mnt-plan-epic';
    }

    return 'mnt-plan-rare';
  }

  // img src for planner image
  getPlanStepImageSrc(step: any, isAlliance: boolean): string {
    if (step.capital) {
      if (isAlliance) {
        return 'images/alliance.png';
      }
      else {
        return 'images/horde.png';
      }
    }
    else if (step.hearth) {
      return 'images/hearth.png';
    }

    return '';
  }

  // img src for planner image
  getPlanImageSrc(boss): string {
    if (!boss.icon) {
      return '';
    }

    return '//wow.zamimg.com/images/wow/icons/tiny/' + boss.icon + '.gif';
  }

  getStepTitle(step: any, isAlliance: boolean): string {
    if (step.capital) {
      return step.title + (isAlliance ? 'Stormwind' : 'Orgrimmar');
    }
    else {
      return step.title;
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}

