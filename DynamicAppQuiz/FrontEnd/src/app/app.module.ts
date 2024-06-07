import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from './api.service';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogStaffComponent } from './log-staff/log-staff.component';
import { RegStaffComponent } from './reg-staff/reg-staff.component';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';

const routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
   QuizCreateComponent
  ],
  imports: [
    BrowserModule,
    
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
      RouterModule.forChild(routes), 
    
    RouterModule.forRoot(routes)
  ],
  providers: [ApiService],
  bootstrap: []
})
export class AppModule { }


