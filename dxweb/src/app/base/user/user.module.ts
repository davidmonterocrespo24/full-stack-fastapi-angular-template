import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/share/shared.module';
import { MaterialModule } from 'src/app/share/material.module';
import { MatCustomTableModule } from 'src/app/web/component/base/mat-custom-table/mat-custom-table.module';
import { UserTableComponent } from './user-table/user-table.component';


@NgModule({
  declarations: [UserTableComponent],
  imports: [
    CommonModule,
   
    SharedModule,
     MaterialModule,
     MatCustomTableModule
  ]
})
export class UserModule { }
