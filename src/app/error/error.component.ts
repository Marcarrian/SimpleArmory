import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.ts',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {

  constructor() {
  }

  public ErrorCtrl($scope, $routeParams, $window) {

    // Analytics for page
    $window.ga('send', 'pageview', 'Error');

    $scope.character = $routeParams.character;
    $scope.realm = $routeParams.realm;
  }
}
