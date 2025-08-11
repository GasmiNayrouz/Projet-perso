import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
// import { ViewUserComponent } from './components/view-user/view-user.component';

const routes: Routes = [
  {
    path: 'create-user',
    component: CreateUserComponent
  },

  {
    path: 'edit-user/:id',
    component: EditUserComponent
  },
  {
    path: 'users-list',
    component: UserListComponent
  },
  // { path: 'view-user/:id', component: ViewUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserManagementRoutingModule {}
