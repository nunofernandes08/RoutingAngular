import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';

const crisisRoutes: Routes = [
  { path: 'crisis-center',  component: CrisisListComponent },
  { path: 'crisis/:id', component: CrisisDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(crisisRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CrisisRoutingModule { }