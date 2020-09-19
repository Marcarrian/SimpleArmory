import { Component } from '@angular/core';

@Component({
  selector: 'app-mounts-planner',
  templateUrl: './mounts-planner.component.html',
  styleUrls: ['./mounts-planner.component.scss'],
})
export class MountsPlannerComponent {

  showPlanner = false;

  constructor() {
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

  getStepTitle(step: any, isAlliance?: boolean): string {
    if (step.capital) {
      return step.title + (isAlliance ? 'Stormwind' : 'Orgrimmar');
    }
    else {
      return step.title;
    }
  }
}
