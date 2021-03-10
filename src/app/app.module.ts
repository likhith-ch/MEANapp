import { AutharizationService } from './autharization.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomrComponent } from './homr/homr.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AccessuserComponent } from './accessuser/accessuser.component';

@NgModule({
  declarations: [
    AppComponent,
    HomrComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    UserprofileComponent,
    AccessuserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AutharizationService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
