import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';

const crisesRoutes: Routes = [
  { path: 'crises',  component: CrisisListComponent },
  { path: 'crisis/:id', component: CrisisDetailComponent}
];

/*const crisisRoutes: Routes = [
  {
    path: 'crisis-center',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  }
];*/

@NgModule({
  imports: [
    RouterModule.forChild(crisesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CrisesRoutingModule { }