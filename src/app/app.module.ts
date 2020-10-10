import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AchievementsComponent } from './achievements/achievements.component';
import { ApplicationComponent } from './application/application.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './settings/settings.component';
import { FooDirective } from './directives/foo.directive';
import { DragDirective } from './directives/drag.directive';
import { DropDirective } from './directives/drop.directive';
import { HttpClientModule } from '@angular/common/http';
import { ProposalFieldComponent } from './login/proposal/proposal-field.component';
import { WOWHEAD_URL, wowheadUrlProvider } from './shared/wowhead-url';
import { CollectableModule } from './collectable/collectable.module';
import { CalendarModule } from './calendar/calendar.module';
import { ReputationModule } from './reputation/reputation.module';
import { OverviewModule } from './overview/overview.module';

@NgModule({
  declarations: [
    AppComponent,
    AchievementsComponent,
    ApplicationComponent,
    LoginComponent,
    ErrorComponent,
    HeaderComponent,
    SettingsComponent,
    FooDirective,
    DragDirective,
    DropDirective,
    ProposalFieldComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CollectableModule,
    CalendarModule,
    ReputationModule,
    OverviewModule,
  ],
  providers: [
    {
      provide: WOWHEAD_URL,
      useFactory: wowheadUrlProvider,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
