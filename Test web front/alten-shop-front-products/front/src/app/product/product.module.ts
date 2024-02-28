import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import { ProductsComponent } from './products/products.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule  } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from "@angular/forms"; 



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
    FormsModule
  ]
})
export class ProductModule { }
