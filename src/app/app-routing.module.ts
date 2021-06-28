import { MarcheComponent } from './marche/marche.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhysiqueComponent } from './physique/physique.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { AddProjetComponent } from './add-projet/add-projet.component';
import { ProjetsComponent } from './projets/projets.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path:'projets',component: ProjetsComponent},
  {path:'addprojet',component: AddProjetComponent},
  {path:'register',component: RegisterComponent},
  {path:'admin',component: AdminComponent},
  {path:'update/:id_user',component: UpdateUserComponent},
  

  {path:'physique',component: PhysiqueComponent},
  {path:'dashboard/:id',component: DashboardComponent},
  {path:'menu',component: MenuComponent},
  {path:'detail/:id',component: UserdetailComponent},
  {path:'marche',component: MarcheComponent},
  {path:"", redirectTo:"menu", pathMatch:"full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
