import { Component } from '@angular/core';
import { Character } from '../character/character';
import { Observable } from 'rxjs';
import { CharacterService } from '../character/character.service';
import { ProfileService } from '../profile/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  public isLoggedIn = true;
  isCollapsed = false;
  character$: Observable<Character>;
  character: Character;
  realm: string;
  public isUsingDarkTheme = true; // TODO implement
  baseUrl = '';

  constructor(public profileService: ProfileService,
              private characterService: CharacterService,
              router: Router) {
    console.log(router.url);
    console.log(window.location.href);
    this.character$ = characterService.character$;
    // TODO we shouldnt need character as a property of this component since we already have the data as an observable
    this.character$.subscribe(character => {
      this.baseUrl = character.region + '/' + character.realm + '/' + character.name;
      this.character = character;
    });
  }

  getUrl(subSite): string {
    let url = this.baseUrl;
    if (subSite !== '') {
      url += '/' + subSite;
    }

    return url;
  }

  toggleDarkTheme(): void {
    const isUsingDarkTheme = localStorage.getItem('darkTheme') === 'true';
    if (isUsingDarkTheme) {
      localStorage.setItem('darkTheme', 'false');
    }
    else {
      localStorage.setItem('darkTheme', 'true');
    }
    // updateTheme(); TODO
  }

  isActive(viewLocation: string, subMenu: boolean = false): boolean {
    // if its a submenu sea() === combinedUrl;rch, then just look for the location in the url
    // and call it good
    if (subMenu) {
      return window.location.href.indexOf(viewLocation) > 0;
    }

    // otherwise, lets try to match it directly
    let combinedUrl = this.baseUrl;
    if (viewLocation !== '') {
      combinedUrl += '/' + viewLocation;
    }

    return window.location.href.includes(combinedUrl);
  }

  guildName(): string {
    if (this.character && this.character.guild) {
      return '<' + this.character.guild.name + '>';
    }

    return '';
  }

  armoryUrl(): string {
    if (this.character) {
      return window.location.protocol + '//' +
        'worldofwarcraft.com/character/' + this.character.region + '/' + this.character.realm + '/' + this.character.name.toLowerCase();
    }

    return '#';
  }
}
