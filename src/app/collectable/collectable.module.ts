import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectableRoutingModule } from './collectable-routing.module';
import { MountComponent } from './mount/mount.component';
import { SharedModule } from '../shared/shared.module';
import { CompanionComponent } from './companion/companion.component';
import { BattlepetComponent } from './battlepet/battlepet.component';
import { ToyComponent } from './toy/toy.component';
import { MountPlannerComponent } from './mount/planner/mount-planner.component';

@NgModule({
  declarations: [
    MountComponent,
    MountPlannerComponent,
    CompanionComponent,
    BattlepetComponent,
    ToyComponent,
  ],
  imports: [
    CommonModule,
    CollectableRoutingModule,
    SharedModule,
  ],
})
export class CollectableModule {
}
