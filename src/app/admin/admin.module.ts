import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminCategoriesComponent } from './categories/admin-categories.component';
import { AdminMissingComponent } from './missing/admin-missing.component';
import { AdminMountsComponent } from './mounts/admin.mounts.compoennt';

@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoriesComponent,
    AdminMissingComponent,
    AdminMountsComponent,
  ],
  imports: [],
  providers: [],
})
export class AdminModule {
}
