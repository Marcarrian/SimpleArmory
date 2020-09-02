import { Component } from '@angular/core';

@Component({
  selector: 'app-battlepets',
  templateUrl: './battlepets.component.html',
  styleUrls: ['./battlepets.component.scss'],
})
export class BattlepetsComponent {

  public BattlePetsCtrl($scope, MountsAndPetsService, $window, SettingsService) {

    $scope.settings = SettingsService;

    // Analytics for page
    $window.ga('send', 'pageview', 'BattlePets');

    MountsAndPetsService.getItems('battlepets', 'pets', 'species').then(function (items) {
      $scope.items = items;
    });
  }
}