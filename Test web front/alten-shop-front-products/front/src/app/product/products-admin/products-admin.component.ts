import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ProductsAdminComponent implements OnInit {

  productDialog: boolean = false;
  productsList: Product[] = [];
  selectedProducts: Product[] = [];
  product: Product = {};
  submitted: boolean = false;

  constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService,private http: HttpClient) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.productsList = products;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
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
        this.selectedProducts?.forEach(product => {
          this.productService.deleteProduct(product.id).subscribe(
            () => {
              this.productsList = this.productsList.filter((val) => val.id !== product.id);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            },
            (error) => {
              console.error('Error deleting product:', error);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting product', life: 3000 });
            }
          );
        });
        this.selectedProducts = null;
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
        this.productService.deleteProduct(product.id).subscribe(
          () => {
            this.productsList = this.productsList.filter(p => p.id !== product.id);
            this.product = {};
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
          },
          (error) => {
            console.error('Error deleting product:', error);
          }
        );
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
        this.productService.updateProduct(this.product.id, this.product).subscribe(
          () => {
            const index = this.productsList.findIndex(p => p.id === this.product.id);
            if (index !== -1) {
              this.productsList[index] = this.product;
            }
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          },
          (error) => {
            console.error('Error updating product:', error);
          }
        );
      } else {
        this.productService.createProduct(this.product).subscribe(
          () => {
            this.productsList.push(this.product);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
          },
          (error) => {
            console.error('Error creating product:', error);
          }
        );
      }

      this.productDialog = false;
      this.product = {};
    }
  }

}
