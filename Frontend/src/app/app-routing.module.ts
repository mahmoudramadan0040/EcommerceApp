import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from './guard/permission.guard';



const routes: Routes = [
  {
    path:'',
    loadChildren: () =>
    import('../app/core/core.module').then((m) => m.CoreModule)
  },
  {
    path:'admin',
    loadChildren :()=>(
      import('../app/admin/admin.module').then((m) => m.AdminModule)
    ),
    canActivate:[PermissionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
