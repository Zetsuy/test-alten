import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import {SelectItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsList: Product[];

  product!: Product;

  sortOptions: SelectItem[];

    sortOrder: number;

    sortField: string;

    sortKey: string = '';

  constructor(private http: HttpClient,private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.loadProducts();

    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'},
      {label: 'Name High to Low', value: '!name'},
      {label: 'Name Low to High', value: 'name'},
      {label: 'Categorie High to Low', value: '!category'},
      {label: 'Categorie Low to High', value: 'category'}
  ];

  this.primengConfig.ripple = true;
  }

  loadProducts() {
    this.http.get<any>('../../../../assets/products.json').subscribe(response => {
      this.productsList = response.data.slice(0,12);
      console.log(this.productsList);
    });
  }

  onSortChange(event) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

}
