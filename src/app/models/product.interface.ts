export class IProduct {
    name: string;
    price: number;
    checked: boolean
    constructor(name: string, price: number, checked: boolean){
      this.name = name;
      this.price = price;
      this.checked = checked;
    }
  }
