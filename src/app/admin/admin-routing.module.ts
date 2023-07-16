import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRoleComponent } from './Roles/list-role/list-role.component';
import { ListUserComponent } from './Users/list-user/list-user.component';

const routes: Routes = [
  {
    path: "roles", component: ListRoleComponent
  },
  {
    path: "users", component: ListUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
