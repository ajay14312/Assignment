import { Component, OnInit } from '@angular/core';
import { IProduct } from './models/product.interface';
import { ProductsService } from './products.service';
import { SharedService } from './shared.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products: IProduct[];
  showLoad = true;
  searchPhrase = '';
  isNameToggle = true;
  isPriceToggle = true;
  isAllSelected = false;
  productObj = new IProduct('', 0, false);
  isFormAppeared = false;
  productIndex = 0;
  showAddProductForm = false;
  formChangeStatus: string;

  constructor(private productsService: ProductsService,
  private sharedService: SharedService) { }

  ngOnInit() {
    this.fetchProducts();
  }

  public fetchProducts() {
    this.productsService
      .fetch()
      .subscribe((products: IProduct[]) => {
        this.parseProducts(products);
      });
  }

  public parseProducts(products: IProduct[]) {
    this.products = products;
    this.products.forEach(element => {
      element.checked = false;
    })
    this.showLoad = false;
  }

  public search(phrase: string) {
    this.showLoad = true;
    this.productsService.search(phrase).subscribe((searchRes: IProduct[]) => {
      this.parseProducts(searchRes);
    })
  }

  public clear() {
    this.searchPhrase = '';
    this.showLoad = true;
    this.fetchProducts();
  }

  public sortBy(propertyName) {
    if(propertyName === 'name') {
      this.isPriceToggle = !this.isPriceToggle;
      if(this.isPriceToggle) {
        this.products.sort(function(a,b){
          return a.name.localeCompare(b.name);
        })
      } else {
        this.products.sort(function(a,b){
          return b.name.localeCompare(a.name);
        })
      }
    } else if(propertyName === 'price') {
      this.isNameToggle = !this.isNameToggle;
      if(this.isNameToggle) {
        this.products.sort(function(a, b){return b.price-a.price});
      } else {
        this.products.sort(function(a, b){return a.price-b.price});
      }
    }
  }

  selectChange(product: IProduct) {
    product.checked = !product.checked;
  }

  removeProduct(product: IProduct) {
    const productIndex = this.products.indexOf(product);
    this.products.splice(productIndex, 1);
  }

  selectAll() {
    this.isAllSelected = !this.isAllSelected;
    if(this.isAllSelected) {
      this.products.forEach(element => {
        element.checked = true;
      })
    } else {
      this.products.forEach(element => {
        element.checked = false;
      })
    }
  }

  removeAll() {
    this.products = [];
    this.isAllSelected = false;
  }

  editProduct(product, type) {
    this.formChangeStatus = type;
    this.isFormAppeared = true;
    this.productObj = new IProduct(product.name, product.price, !product.checked)
    this.productIndex = this.products.indexOf(product);
  }

  onSubmit(product) {
    this.isFormAppeared = false;
    this.showAddProductForm = false;
    if(this.formChangeStatus === 'edit') {
      this.products[this.productIndex].name = product.name;
      this.products[this.productIndex].price = product.price;
      this.products[this.productIndex].checked = product.checked;
    } else {
      this.products.push(product);
    }
    this.sharedService.storeToSession('MOCK_PRODUCTS', this.products);
  }

  cancelEdit() {
    this.isFormAppeared = false;
  }

  addProduct(type) {
    this.formChangeStatus = type;
    this.showAddProductForm = true;
    this.productObj = new IProduct('', 0, false);
  }

}
