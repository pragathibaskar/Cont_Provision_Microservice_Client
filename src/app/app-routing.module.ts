import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PATHS } from './core/contants/paths.const';

const routes: Routes = [
  {
    path: PATHS.cierresContables,
    loadChildren: './adif-features/cierres-contables/cierres-contables.module#CierresContablesModule',
    data: {
      breadcrumb: PATHS.cierresContables
    }
  },
  {
    path: PATHS.provisionesAsscoadas,
    loadChildren: './adif-features/provisiones-asscoadas/provisiones-asscoadas.module#ProvisionesAsscoadasModule'
  },
  { path: '**', redirectTo: PATHS.cierresContables, pathMatch: 'full', canActivate: [] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
