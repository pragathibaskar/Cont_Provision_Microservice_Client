import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvisionesAsscoadasComponent } from './provisiones-asscoadas.component';
import { ProvisionesAsscoadasHomeComponent } from './provisiones-asscoadas-home/provisiones-asscoadas-home.component';
import { ProvisionesAsscoadasActionsComponent } from './provisiones-asscoadas-actions/provisiones-asscoadas-actions.component';

const routes: Routes = [
  { path: '', component: ProvisionesAsscoadasComponent, children: [
    { path: 'provisiones-asscoadas-home', component: ProvisionesAsscoadasHomeComponent },
    { path: 'provisiones-asscoadas-actions', component: ProvisionesAsscoadasActionsComponent,
      data: { desc: 'Provisiones Asscoadas - Nuevo'} },
    { path: '', component: ProvisionesAsscoadasHomeComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvisionesAsscoadasRoutingModule { }
