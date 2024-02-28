import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { MessageService, SelectItem, ConfirmationService } from 'primeng/api';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ProductsAdminComponent implements OnInit {

  productsList: Product[];

  selectedProducts: Product[] = [];

  clonedProducts: { [s: string]: Product } = {};

  constructor(private http: HttpClient,private confirmationService: ConfirmationService,private productService: ProductService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any>('../../../../assets/products.json').subscribe(response => {
      this.productsList = response.data;
    });
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product.id as number] = { ...product };
}

onRowEditSave(product: Product) {
        delete this.clonedProducts[product.id as number];
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
}


onRowEditCancel(product: Product, index: number) {
    this.productsList[index] = this.clonedProducts[product.id as number];
    delete this.clonedProducts[product.id as number];
}

deleteProduct(product: Product) {
  const index = this.productsList.findIndex(p => p.id === product.id);
  if (index !== -1) {
    this.productsList.splice(index, 1);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is deleted' });
  } else {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product not found' });
  }
}


}
