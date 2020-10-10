import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from './components/bar/bar.component';
import { ProgressbarComponent } from './components/bar/progress/progressbar.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ProgressFormatterPipe } from './pipe/progress-formatter.pipe';

@NgModule({
  declarations: [
    BarComponent,
    ProgressbarComponent,
    SummaryComponent,
    ProgressFormatterPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    BarComponent,
    ProgressbarComponent,
    SummaryComponent,
  ],
})
export class SharedModule {
}
