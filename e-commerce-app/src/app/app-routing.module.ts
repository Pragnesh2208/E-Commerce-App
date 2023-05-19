import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./public/auth-module/components/login/login.component";
import { SignupComponent } from "./public/auth-module/components/signup/signup.component";
import { PUBLIC_ROUTE_CONSTANT } from "./public/auth-module/constants/route.constants";
import { HomeComponent } from "./public/home-module/home.component";
import { ROUTE } from "./shared/constants";
import { AdminComponent } from "./private/modules/admin-module/admin.component";
import { AuthGuard } from "./shared/guards";

const routes: Routes = [
  {
    path : '',
    component : HomeComponent,
    loadChildren : () => import('./public/home-module/home-routing.module').then(m =>m.HomeRoutingModule)
  },
  { path: PUBLIC_ROUTE_CONSTANT.LOGIN,
     component: LoginComponent
  },
  { path: PUBLIC_ROUTE_CONSTANT.SIGNUP,
    component: SignupComponent
  },
  {
    path : ROUTE.admin,
    component : AdminComponent,
    canActivate: [AuthGuard],
    loadChildren : () => import('./private/modules/admin-module/admin-routing.module').then((m) => m.AdminRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
