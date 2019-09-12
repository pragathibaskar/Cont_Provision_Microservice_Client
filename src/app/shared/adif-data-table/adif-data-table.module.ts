import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { CoreModule } from '../../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    DataTableComponent
  ],
  declarations: [DataTableComponent]
})
export class AdifDataTableModule { }
