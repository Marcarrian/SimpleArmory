import { Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.ts',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {

  constructor() {
  }

  public OverviewCtrl($scope, AchievementsService, $location, $window) {

    // Analytics for page
    $window.ga('send', 'pageview', 'Overview');

    AchievementsService.getAchievements().then(function (achievements) {
      $scope.achievements = achievements;
    });

    $scope.baseUrl = '#' + $location.$$path;
  }
}