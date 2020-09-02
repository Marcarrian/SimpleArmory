import { Component } from '@angular/core';

@Component({
  selector: 'app-companions',
  templateUrl: './companions.component.html',
  styleUrls: ['./companions.component.scss'],
})
export class CompanionsComponent {

  constructor() {
  }

  public CompanionsCtrl($scope, MountsAndPetsService, $window, SettingsService) {

    $scope.settings = SettingsService;

    // Analytics for page
    $window.ga('send', 'pageview', 'Companions');

    MountsAndPetsService.getItems('pets', 'pets', 'species').then(function (items) {
      $scope.items = items;
    });
  }
}
