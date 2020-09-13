import { Injectable } from '@angular/core';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root',
})
export class PlannerService {

  parsedStepsObject;

  constructor(private _loginService: ProfileService) {
    // this._loginService.onLogin(function () {
    //   this.parsedStepsObject = undefined;
    // });
  }

  getSteps(items) {
    // if (parsedStepsObject) {
    //   return $q.when(parsedStepsObject);
    // }
    //
    // var profile;
    // return LoginService.getProfile($routeParams)
    //   .then(function (p) {
    //     profile = p;
    //     $log.log('Parsing planner.json...');
    //     return $http.get('data/planner.json', {cache: true});
    //   })
    //   .then(function (data) {
    //     parsedStepsObject = parseStepsObject(data.data.steps, items);
    //     return parsedStepsObject;
    //   });
  }

  checkStepCompleted(step, items) {
    // var completed = true;
    // var showAll = false; // used for debugging
    // var neededBosses = [];
    //
    // // check to see if we've finished all the bosses
    // if (step.bosses) {
    //   step.bosses.forEach(boss => {
    //     if (boss.isAlliance && items.isAlliance && items.lookup[boss.ID] === undefined) {
    //       neededBosses.push(boss);
    //       completed = false;
    //     }
    //     else if (boss.isHorde && !items.isAlliance && items.lookup[boss.ID] === undefined) {
    //       neededBosses.push(boss);
    //       completed = false;
    //     }
    //     else if ((boss.ID !== undefined && items.lookup[boss.ID] === undefined) || showAll) {
    //       neededBosses.push(boss);
    //       completed = false;
    //     }
    //   });
    // }
    //
    // // reset bosses array to the ones we need
    // step.bosses = neededBosses;

    return {}; //TODO remove
    // return completed;
  }

  // gotta love recursion
  parseStepsObject(steps, items): any[] {
    var neededSteps = [];
    steps.forEach(step => {
      if (step.steps) {
        var neededChildSteps = this.parseStepsObject(step.steps, items);

        // if we have child steps and we found ones that were needed, then we can
        // go ahead and add ourself as a step and our children too
        if (neededChildSteps.length > 0) {
          neededSteps.push(step);
          neededSteps = neededSteps.concat(neededChildSteps);
          if (step.finalStep) {
            neededSteps.push({'title': step.finalStep, 'hearth': true});
          }
        }
      }
      else if (!this.checkStepCompleted(step, items)) {
        neededSteps.push(step);
      }
    });

    return neededSteps;
  }
}

