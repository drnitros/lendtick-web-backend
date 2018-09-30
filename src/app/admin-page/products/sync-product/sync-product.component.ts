import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sync-product',
  templateUrl: './sync-product.component.html',
  styleUrls: ['./sync-product.component.scss']
})
export class SyncProductComponent implements OnInit {
	// Properties
	// ====================== //
	public products = [];
	public selectedProduct: string;

	constructor() { }

	ngOnInit() {
		this.products = [
            {label: 'Bukalapak', value: 'Bukalapak'},
            {label: 'Tokopedia', value: 'Tokopedia'},
            {label: 'Lazada', value: 'Lazada'},
            {label: 'JD.ID', value: 'JD.ID'},
        ];
	}

}
