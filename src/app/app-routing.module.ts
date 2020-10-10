import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ErrorComponent } from './error/error.component';
import { SettingsComponent } from './settings/settings.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { LoginComponent } from './login/login.component';
import { CharacterResolver } from './shared/character/character.resolver';

//      allow me to download json for admin site
//     $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data|chrome-extension):/); TODO

const routes: Routes = [
  {
    path: 'admin/:area/:section?/:subsection?',
    component: AdminComponent,
    resolve: {
      character: CharacterResolver,
    },
  },
  {
    path: 'admin',
    redirectTo: '/admin/categories/achievements/quests',
  },
  {
    path: 'error/:realm/:character',
    component: ErrorComponent,
  },
  {
    path: ':region/:realm/:character/settings',
    component: SettingsComponent,
    resolve: {
      character: CharacterResolver,
    },
  },
  {
    path: ':region/:realm/:character/achievements/:category',
    component: AchievementsComponent,
    resolve: {
      character: CharacterResolver,
    },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '*',
    component: LoginComponent,
  },
  {
    path: ':region/:realm/:character/collectable',
    loadChildren: () => import('./collectable/collectable.module').then(m => m.CollectableModule),
    resolve: {
      character: CharacterResolver,
    },
  },
  {
    path: ':region/:realm/:character/calendar',
    loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule),
    resolve: {
      character: CharacterResolver,
    },
  },
  {
    path: ':region/:realm/:character/reputation',
    loadChildren: () => import('./reputation/reputation.module').then(m => m.ReputationModule),
    resolve: {
      character: CharacterResolver,
    },
  },
  {
    path: ':region/:realm/:character',
    loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
    resolve: {
      character: CharacterResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
