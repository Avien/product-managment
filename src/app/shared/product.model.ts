export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  created_on: string;

  constructor(id?: number){
    this.id = id;
    this.created_on = (new Date()).toISOString();
  }
}
