import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./public/auth-module/components/login/login.component";
import { SignupComponent } from "./public/auth-module/components/signup/signup.component";
import { PUBLIC_ROUTE_CONSTANT } from "./public/auth-module/constants/route.constants";

const routes: Routes = [
  { path: PUBLIC_ROUTE_CONSTANT.LOGIN,
     component: LoginComponent
  },
  { path: PUBLIC_ROUTE_CONSTANT.SIGNUP,
    component: SignupComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
