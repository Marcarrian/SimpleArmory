import { Component } from '@angular/core';
import { ProfileService } from './login/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private profileService: ProfileService) {
  }
}

