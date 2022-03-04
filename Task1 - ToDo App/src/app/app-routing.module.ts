import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path:'users',
  //   loadChildren:()=>import('./account/admin-view-user/admin-view-user.component').then((m)=>m.AdminViewUserComponent)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
