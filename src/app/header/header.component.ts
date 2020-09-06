import { Component } from '@angular/core';
import { Character } from '../character/character';
import { Observable } from 'rxjs';
import { CharacterService } from '../character/character.service';
import { ProfileService } from '../login/profile.service';

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

  constructor(public profileService: ProfileService, private characterService: CharacterService) {
    this.character$ = characterService.character$;
    // TODO we shouldnt need character as a property of this component since we already have the data as an observable
    this.character$.subscribe(character => {
      this.character = character;
    });
  }

  getUrl(subSite): string {
    let url = this.getBaseUrl(this.character);
    if (subSite !== '') {
      url += '/' + subSite;
    }

    return url;
  }

  private getBaseUrl(character: Character): string {
    if (!character) {
      return '';
    }

    return '/' + character.region.toLowerCase() + '/' +
      character.realm.toLowerCase() + '/' +
      character.name.toLowerCase();
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
    // // if its a submenu sea() === combinedUrl;rch, then just look for the location in the url
    //     // // and call it good
    //     // if (subMenu) {
    //     //   return this.activatedRoute.snapshot.url.indexOf(viewLocation) > 0;
    //     // }
    //     //
    //     // // otherwise, lets try to match it directly
    //     // let combinedUrl = this.getBaseUrl(this.character);
    //     // if (viewLocation !== '') {
    //     //   combinedUrl += '/' + viewLocation;
    //     // }
    //     //
    //     // return $location.path
    return true;
  }

  guildName(): string {
    if (this.character && this.character.guild) {
      return '<' + this.character.guild.name + '>';
    }

    return '';
  }

  armoryUrl(): string {
    if (this.character) {
      const c = this.character;
      return window.location.protocol + '//' +
        'worldofwarcraft.com/character/' + c.region + '/' + this.realm + '/' + c.name.toLowerCase();
    }

    return '#';
  }
}
