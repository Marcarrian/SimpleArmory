import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MountsModule } from './mounts/mounts.module';
import { AchievementsComponent } from './achievements/achievements.component';
import { ApplicationComponent } from './application/application.component';
import { BattlepetsComponent } from './battlepets/battlepets.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { CompanionsComponent } from './companions/companions.component';
import { ErrorComponent } from './error/error.component';
import { ReputationComponent } from './reputation/reputation.component';
import { ReputationRowComponent } from './reputation/row/reputation-row.component';
import { HeaderComponent } from './header/header.component';
import { ToysComponent } from './toys/toys.component';
import { SettingsComponent } from './settings/settings.component';
import { OverviewComponent } from './overview/overview.component';
import { FooDirective } from './directives/foo.directive';
import { DragDirective } from './directives/drag.directive';
import { DropDirective } from './directives/drop.directive';

@NgModule({
  declarations: [
    AppComponent,
    AchievementsComponent,
    ApplicationComponent,
    BattlepetsComponent,
    CalendarComponent,
    LoginComponent,
    CompanionsComponent,
    ErrorComponent,
    ReputationComponent,
    ReputationRowComponent,
    HeaderComponent,
    ToysComponent,
    SettingsComponent,
    OverviewComponent,
    FooDirective,
    DragDirective,
    DropDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MountsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
