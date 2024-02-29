import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { ProductsComponent } from './products/products.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule  } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from "@angular/forms"; 
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [
    ProductsAdminComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    FormsModule,
    DialogModule,
    ConfirmDialogModule
  ]
})
export class ProductModule { }
