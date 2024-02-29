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

  productDialog: boolean = false;

  productsList: Product[];

  selectedProducts!: Product[] | null;

  product!: Product;

  submitted: boolean = false;

  constructor(private http: HttpClient,private confirmationService: ConfirmationService,private productService: ProductService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any>('../../../../assets/products.json').subscribe(response => {
      this.productsList = response.data;
    });
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
}

deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.productsList = this.productsList.filter((val) => !this.selectedProducts?.includes(val));
            this.selectedProducts = null;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        }
    });
}

editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
}

deleteProduct(product: Product) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + product.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.productsList = this.productsList.filter((val) => val.id !== product.id);
            this.product = {};
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        }
    });
  }


    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  saveProduct() {
      this.submitted = true;

      if (this.product.name?.trim()) {
          if (this.product.id) {
              this.productsList[this.findIndexById(this.product.id)] = this.product;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          } else {
              this.product.id = this.createId();
              this.product.image = 'product-placeholder.svg';
              this.productsList.push(this.product);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
          }

          this.productsList = [...this.productsList];
          this.productDialog = false;
          this.product = {};
      }
  }

  findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.productsList.length; i++) {
          if (this.productsList[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): number {
    return Math.floor(Math.random() * 100000);
  }



}
