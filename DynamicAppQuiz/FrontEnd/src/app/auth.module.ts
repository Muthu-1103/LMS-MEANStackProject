import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
@NgModule({
    declarations:[RegisterComponent,LoginComponent],
    imports:[CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
    providers:[AuthModule]
})
export class AuthModule{

}
