import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CierresContablesComponent } from './cierres-contables.component';
import { CierresContablesHomeComponent } from './cierres-contables-home/cierres-contables-home.component';
import { CierresContablesActionsComponent } from './cierres-contables-actions/cierres-contables-actions.component';
import { PATHS } from '../../core/contants/paths.const';

const routes: Routes = [
  { path: '', component: CierresContablesComponent, children: [
    { path: 'cierres-contable-home', component: CierresContablesHomeComponent },
    { path: 'cierres-contable-actions', component: CierresContablesActionsComponent,
      data: { desc: 'Cierres Contable - Nuevo'} },
    { path: 'cierres-contable-edit/:id', component: CierresContablesActionsComponent,
      data: { desc: 'Cierres Contable - Editar'} },
    {
      path: PATHS.provisionesAsscoadas,
      loadChildren: '../provisiones-asscoadas/provisiones-asscoadas.module#ProvisionesAsscoadasModule'
    },
    { path: '', component: CierresContablesHomeComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CierresContablesRoutingModule { }
