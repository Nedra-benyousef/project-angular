import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProjetsComponent } from './projets/projets.component';
import { AddProjetComponent } from './add-projet/add-projet.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PhysiqueComponent } from './physique/physique.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { MarcheComponent } from './marche/marche.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
//import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjetsComponent,
    AddProjetComponent,
    UpdateUserComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    PhysiqueComponent,
    DashboardComponent,
    MenuComponent,
    MarcheComponent,
    UserdetailComponent,
    
    //ChartsModule
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    //ChartsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
