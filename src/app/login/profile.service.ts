import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Character } from '../character/character';
import { map, switchMap } from 'rxjs/operators';
import { armorystatsUrl } from '../util/constants';
import { Profile, ProfileMedia } from './profile';
import { CharacterService } from '../character/character.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  private _profile$ = new ReplaySubject<Profile>(1);
  private _profileMediaAvatarUrl$ = new ReplaySubject<string>(1);

  constructor(private httpClient: HttpClient, private characterService: CharacterService) {
    this.characterService.character$.pipe(
      switchMap(character => this.getProfile$(character)),
    ).subscribe(profile => this._profile$.next(profile));

    this.characterService.character$.pipe(
      switchMap(character => this.getProfileMediaAvatarUrl$(character)),
    ).subscribe(profile => this._profileMediaAvatarUrl$.next(profile));
  }

  public get profile$(): Observable<Profile> {
    return this._profile$.asObservable();
  }

  public get profileMediaAvatarUrl$(): Observable<string> {
    return this._profileMediaAvatarUrl$.asObservable();
  }

  private getProfile$(character: Character): Observable<Profile> {
    return this.httpClient.get<Profile>(`${armorystatsUrl}${character.region}/${character.realm}/${character.name}/`).pipe(
      map(profile => {
        return {
          ...profile,
          side: profile.faction.type === 'HORDE' ? 'H' : 'A',
        };
      }),
    );
  }

  private getProfileMediaAvatarUrl$(character: Character): Observable<string> {
    return this.httpClient.get<ProfileMedia>(
      `${armorystatsUrl}${character.region}/${character.realm}/${character.name}/character-media`,
    ).pipe(map(profileMedia => profileMedia.avatar_url));
  }
}
