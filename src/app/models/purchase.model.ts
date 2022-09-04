export class Purchase {
    id: number | undefined;
    userId: number | undefined;
    bookId: number | undefined;
    price: number | undefined;
    purchaseTime: Date = new Date();
  
    constructor(bookId?: number, price?: number) {
      this.bookId = bookId;
      this.price = price;
    }
}
