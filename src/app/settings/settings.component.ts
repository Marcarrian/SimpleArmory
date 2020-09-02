import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  constructor() {
  }

  public SettingsCtrl($scope, $location, $window) {
    // Analytics for page
    $window.ga('send', 'pageview', 'Settings');

    //AchievementsService.getAchievements().then(function(achievements){
    //    $scope.achievements = achievements;
    //});
  }
}
