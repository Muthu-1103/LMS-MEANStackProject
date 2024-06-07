import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HomeStudComponent } from './home-stud/home-stud.component';
import { RegStaffComponent } from './reg-staff/reg-staff.component';
import { LogStaffComponent } from './log-staff/log-staff.component';
import { StaffComponent } from './staff/staff.component';
import { HomeStaffComponent } from './home-staff/home-staff.component';
import { PostmsgComponent } from './postmsg/postmsg.component';
import { ProfileStaffComponent } from './profile-staff/profile-staff.component';
import { GroupDetComponent } from './group-det/group-det.component';
import { DelGroupComponent } from './del-group/del-group.component';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';
import { AttendQuizComponent } from './attend-quiz/attend-quiz.component';
import { Staff1Component } from './staff1/staff1.component';
import { StafflistComponent } from './stafflist/stafflist.component';
import { AuthGuard } from './auth.guard';
import { UserProfileComponent } from './update-prof/update-prof.component';
import { UserProfile1Component } from './update-staffpass/update-staffpass.component';
//import { AuthGuard } from './auth.guard';

export const routes: Routes = [
	  {path:'',redirectTo:'/home' ,pathMatch:'full'},
	  {path:'home',component:HomeComponent},
	  { path: 'register', component: RegisterComponent },
	  { path: 'login', component: LoginComponent },
	  {path:'homeStud',component:HomeStudComponent,canActivate: [AuthGuard] },
	  {path:'reg-staff',component:RegStaffComponent},
	  {path:'log-staff',component:LogStaffComponent},
	  {path:'staff', component:StaffComponent,canActivate: [AuthGuard]},
	  {path:'homeStaff',component:HomeStaffComponent ,canActivate: [AuthGuard]},
	  {path:'postmsg',component:PostmsgComponent,canActivate: [AuthGuard]},
	  {path:'profile-staff',component:ProfileStaffComponent,canActivate: [AuthGuard]},
	  {path:'group-det',component:GroupDetComponent,canActivate: [AuthGuard]},
	  {path:'del-grp',component:DelGroupComponent,canActivate: [AuthGuard]},
		{path:'quiz',component:QuizCreateComponent,canActivate: [AuthGuard]},
		{path:'attend',component:AttendQuizComponent,canActivate: [AuthGuard]},
		{path:'grouplist',component:Staff1Component,canActivate: [AuthGuard]},
		{path:'stafflist',component:StafflistComponent,canActivate: [AuthGuard]},
		{path:'update-prof',component:UserProfileComponent},
		{path:'update-staffpass',component:UserProfile1Component}
	 ];
