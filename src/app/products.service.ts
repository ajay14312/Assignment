import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { IProduct } from './models/product.interface';
import { SharedService } from './shared.service';

const MOCK_PRODUCTS : IProduct[] = [
  { name: 'Hammer', price: 5, checked: false},
  { name: 'Screwdriver', price: 12, checked: false},
  { name: 'Pliers', price: 25, checked: false},
  { name: 'Wrench', price: 7, checked: false}
];

@Injectable()
export class ProductsService {
    constructor(private sharedService: SharedService){
      this.sharedService.storeToSession('MOCK_PRODUCTS', MOCK_PRODUCTS);
    }

    /**
     * will return full list of mocked products
     * Delayed operation
     */
    public fetch():Observable<IProduct[]>{
      return Observable
        .of([...this.sharedService.getFromSession('MOCK_PRODUCTS')])
        .delay(Math.random() * 5000);
    }

    /**
     * will return mocked products, filtered by input phrase
     * Delayed operation
     */
    public search(phrase: string) : Observable<IProduct[]>{
      const filtered = this.sharedService.getFromSession('MOCK_PRODUCTS')
        .filter(p=>(new RegExp(phrase, 'ig')).test(p.name));

      return Observable
        .of(filtered)
        .delay(Math.random() * 5000);
    }

}