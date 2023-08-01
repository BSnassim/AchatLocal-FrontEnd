import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './Users/list-user/list-user.component';
import { ListDepartementComponent } from './Departements/list-departement/list-departement.component';

const routes: Routes = [
  {
    path: "users", component: ListUserComponent
  },
  {
    path: "departements", component: ListDepartementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
