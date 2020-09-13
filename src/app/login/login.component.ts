import { Component } from '@angular/core';
import { BlizzardRealmService } from '../blizzard/blizzard-realm.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public euRealmNames: string[] = [];

  constructor(public blizzardRealmService: BlizzardRealmService) {
    this.euRealmNames = blizzardRealmService.euRealms().map(realm => realm.name);
  }

}
