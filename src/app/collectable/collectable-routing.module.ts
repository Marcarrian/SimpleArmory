import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MountComponent } from './mount/mount.component';
import { CompanionComponent } from './companion/companion.component';
import { BattlepetComponent } from './battlepet/battlepet.component';
import { ToyComponent } from './toy/toy.component';

const routes: Routes = [
  {
    path: 'mounts',
    component: MountComponent,
  },
  {
    path: ':companions',
    component: CompanionComponent,
  },
  {
    path: 'battlepets',
    component: BattlepetComponent,
  },
  {
    path: 'toys',
    component: ToyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectableRoutingModule {
}
