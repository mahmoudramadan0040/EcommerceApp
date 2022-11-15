import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent,
    children:[
      {path:'',component:MainComponent},
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent},
      {path:'products',component:ProductListComponent},
      {path:'product/:id',component:ProductDetailsComponent},
      {path:'profile',component:ProfileComponent}
    ],
  },

];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  bootstrap: [HomeComponent]
})
export class CoreRoutingModule {}
