import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './fragments/footer/footer.component';
import { SidebarComponent } from './fragments/sidebar/sidebar.component';
import { MainShellComponent } from './fragments/main-shell/main-shell.component';
import { MaterialModule } from './material.module';
 

@NgModule({
  declarations: [FooterComponent, SidebarComponent, MainShellComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule    
  ]
})
export class SharedModule { }
