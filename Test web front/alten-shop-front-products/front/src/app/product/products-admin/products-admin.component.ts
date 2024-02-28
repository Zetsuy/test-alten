import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent implements OnInit {

  productsList: Product[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any>('../../../../assets/products.json').subscribe(response => {
      this.productsList = response.data;
    });
  }

}
