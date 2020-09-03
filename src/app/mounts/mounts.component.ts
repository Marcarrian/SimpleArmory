import { Component } from '@angular/core';
import { MountsService, MountSummary } from './mounts.service';
import { PlannerService } from '../planner/planner.service';
import { ApplicationService } from '../application/application.service';
import { ActivatedRoute } from '@angular/router';
import { Character } from '../login/character';

@Component({
  selector: 'app-mounts',
  templateUrl: './mounts.component.html',
  styleUrls: ['./mounts.component.scss'],
})
export class MountsComponent {

  mountSummary: MountSummary;
  showPlanner = false;
  plannerReturned = false;
  planner = [];
  wowHeadUrl = 'wowhead.com';

  constructor(private mountsService: MountsService,
              private plannerService: PlannerService,
              public applicationService: ApplicationService,
              private activatedRoute: ActivatedRoute) {
    const region = activatedRoute.snapshot.paramMap.get('region');
    const realm = activatedRoute.snapshot.paramMap.get('realm');
    const charactername = activatedRoute.snapshot.paramMap.get('character');
    // Analytics for page
    // $window.ga('send', 'pageview', 'Mounts');
    const character: Character = {region: 'eu', realm: 'kazzak', name: 'marcarrian'};
    this.mountsService.mountSummary$(character).subscribe(mountSummary => this.mountSummary = mountSummary);
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
  getPlanStepImageSrc(step): string {
    if (step.capital) {
      if (this.mountSummary?.isAlliance) {
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

  getStepTitle(step): string {
    if (step.capital) {
      return step.title + (this.mountSummary?.isAlliance ? 'Stormwind' : 'Orgrimmar');
    }
    else {
      return step.title;
    }
  }

  achFormater(n: number, d: number): string {
    if (!n || !d) {
      return '';
    }

    const percentage = n / d * 100;

    // if the percentage is low enough, don't print the numbers, just use the percentage
    // TODO why?
    if (percentage < 18) {
      return percentage + '%';
    }

    return '' + n + ' / ' + d + ' (' + percentage + '%)';
  }
}

