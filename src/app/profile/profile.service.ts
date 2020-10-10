import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { armorystatsUrl } from '../util/constants';
import { CharacterService } from '../shared/character/character.service';
import { Profile, ProfileMedia } from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  private _profile$ = new ReplaySubject<Profile>(1);
  private _profileAvatarUrl$ = new ReplaySubject<string>(1);

  constructor(private httpClient: HttpClient, private characterService: CharacterService) {
    this.profileByCharacter$().subscribe(profile => this._profile$.next(profile));
    this.profileAvatarUrlByCharacter$().subscribe(avatarUrl => this._profileAvatarUrl$.next(avatarUrl));
  }

  public get profile$(): Observable<Profile> {
    return this._profile$.asObservable();
  }

  public get profileAvatarUrl$(): Observable<string> {
    return this._profileAvatarUrl$.asObservable();
  }

  private profileByCharacter$(): Observable<Profile> {
    return this.characterService.character$.pipe(
      switchMap(character =>
        this.httpClient.get<Profile>(`${armorystatsUrl}${character.region}/${character.realm}/${character.name}/`).pipe(
          map(profile => {
            return {
              ...profile,
              side: profile.faction.type === 'HORDE' ? 'H' : 'A',
            } as Profile;
          }),
        )));
  }

  private profileAvatarUrlByCharacter$(): Observable<string> {
    return this.characterService.character$.pipe(
      switchMap(character => this.httpClient.get<ProfileMedia>(
        `${armorystatsUrl}${character.region}/${character.realm}/${character.name}/character-media`,
      ).pipe(map(profileMedia => profileMedia.avatar_url))),
    );
  }
}
