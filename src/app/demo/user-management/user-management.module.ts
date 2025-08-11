import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserService } from './components/services/user.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ConfirmationDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreateUserComponent, EditUserComponent, ViewUserComponent, UserListComponent,ConfirmationDialogComponent ],
  imports: [CommonModule,
      UserManagementRoutingModule,
       SharedModule,
       MatDialogModule,
      ReactiveFormsModule,
      FormsModule

      ],
  providers: [UserService]
})
export class UserManagementModule {}
