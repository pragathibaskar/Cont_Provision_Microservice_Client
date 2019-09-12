import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CierresContablesRoutingModule } from './cierres-contables-routing.module';
import { CierresContablesHomeComponent } from './cierres-contables-home/cierres-contables-home.component';
import { CierresContablesComponent } from './cierres-contables.component';
import { CoreModule } from '../../core/core.module';
import { CierresContablesActionsComponent } from './cierres-contables-actions/cierres-contables-actions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotificationModule } from '../../shared/notification/notification.module';
import { AdifDataTableModule } from '../../shared/adif-data-table/adif-data-table.module';


@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    CierresContablesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdifDataTableModule,
    HttpClientModule,
    NotificationModule
  ],
  declarations: [CierresContablesHomeComponent, CierresContablesComponent, CierresContablesActionsComponent]
})
export class CierresContablesModule { }
