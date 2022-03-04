import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import { AdminViewUserComponent } from './admin-view-user/admin-view-user.component';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'register',
    component:RegistrationComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'users',
    component:AdminViewUserComponent
  },
  {
    path:'users/:listId',
    component:AdminViewUserComponent
  },
  {
    path:'users/:listId/tasks/:taskId',
    component:AdminAddUserComponent
  },
  {
    path:'users/:listId/new-task',
    component:AdminAddUserComponent
  },
  {
    path:'users/:listId/viewTask',
    component:UserDashboardComponent
  },
  {
    path:'users/:listId/editTasks/:taskId',
    component:EditTaskComponent
  }
  // {
  //   path:'addtasks/:listId',
  //   component:AdminAddUserComponent
  // },
  // {
  //   path:'dashboard',
  //   component:UserDashboardComponent
  // }
  // {
  //   path:'dashboard/:listId',
  //   component:UserDashboardComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
