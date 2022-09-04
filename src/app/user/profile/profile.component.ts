import { Component, OnInit } from '@angular/core';
import { PurchaseItem } from 'src/app/models/purchase-item.model';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  purchaseItemList: Array<PurchaseItem> = [];
  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.purchaseService.getAllPurchaseItems().subscribe({
      next: (data: Array<PurchaseItem>) => {
        this.purchaseItemList = data;
      }
    })
  }

}
