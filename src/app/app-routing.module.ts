import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ErrorComponent } from './error/error.component';
import { SettingsComponent } from './settings/settings.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { BattlepetsComponent } from './battlepets/battlepets.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CompanionsComponent } from './companions/companions.component';
import { MountsComponent } from './mounts/mounts.component';
import { ToysComponent } from './toys/toys.component';
import { OverviewComponent } from './overview/overview.component';
import { ReputationComponent } from './reputation/reputation.component';
import { LoginComponent } from './login/login.component';
import { CharacterResolver } from './character/character.resolver';

//      allow me to download json for admin site
//     $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data|chrome-extension):/); TODO

const routes: Routes = [
  {
    path: 'admin/:area/:section?/:subsection?',
    component: AdminComponent,
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
  },
  {
    path: ':region/:realm/:character/achievements/:category',
    component: AchievementsComponent,
    resolve: {
      character: CharacterResolver,
    },
  },
  {
    path: ':region/:realm/:character/collectable/battlepets',
    component: BattlepetsComponent,
  },
  {
    path: ':region/:realm/:character/calendar',
    component: CalendarComponent,
  },
  {
    path: ':region/:realm/:character/collectable/companions',
    component: CompanionsComponent,
  },
  {
    path: ':region/:realm/:character/collectable/mounts',
    component: MountsComponent,
    resolve: {
      character: CharacterResolver,
    },
  },
  {
    path: ':region/:realm/:character/collectable/toys',
    component: ToysComponent,
  },
  {
    path: ':region/:realm/:character',
    component: OverviewComponent,
  },
  {
    path: ':region/:realm/:character/reputation',
    component: ReputationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '*',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
