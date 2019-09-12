import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvisionesAsscoadasRoutingModule } from './provisiones-asscoadas-routing.module';
import { ProvisionesAsscoadasComponent } from './provisiones-asscoadas.component';
import { ProvisionesAsscoadasHomeComponent } from './provisiones-asscoadas-home/provisiones-asscoadas-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { ProvisionesAsscoadasActionsComponent } from './provisiones-asscoadas-actions/provisiones-asscoadas-actions.component';
import { AdifDataTableModule } from '../../shared/adif-data-table/adif-data-table.module';
import { NotificationModule } from '../../shared/notification/notification.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ProvisionesAsscoadasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdifDataTableModule,
    NotificationModule
  ],
  declarations: [ProvisionesAsscoadasHomeComponent, ProvisionesAsscoadasComponent, ProvisionesAsscoadasActionsComponent]
})
export class ProvisionesAsscoadasModule { }
