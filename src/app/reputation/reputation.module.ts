import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReputationRoutingModule } from './reputation-routing.module';
import { ReputationComponent } from './reputation.component';
import { ReputationRowComponent } from './row/reputation-row.component';

@NgModule({
  declarations: [
    ReputationComponent,
    ReputationRowComponent,
  ],
  imports: [
    CommonModule,
    ReputationRoutingModule,
  ],
})
export class ReputationModule {
}
