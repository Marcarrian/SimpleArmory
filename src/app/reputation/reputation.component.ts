import { Component } from '@angular/core';

@Component({
  selector: 'app-reputation',
  templateUrl: './reputation.component.html',
  styleUrls: ['./reputation.component.scss'],
})
export class ReputationComponent {
  public ReputationCtrl($scope, FactionsService, $window) {

    // Analytics for page
    $window.ga('send', 'pageview', 'Reputation');

    FactionsService.getFactions().then(function (items) {
      $scope.items = items;
    });
  }
}