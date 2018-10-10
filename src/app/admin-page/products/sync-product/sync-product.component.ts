import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

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

	constructor(
		private productService: ProductService
	) { }

	ngOnInit() {
		this.fetchProduct();
		
		this.products = [
            {label: 'Bukalapak', value: 'Bukalapak'},
            {label: 'Tokopedia', value: 'Tokopedia'},
            {label: 'Lazada', value: 'Lazada'},
            {label: 'JD.ID', value: 'JD.ID'},
        ];
	}

	fetchProduct(){
		this.productService.getProductAll().subscribe(res =>{
			console.log(res);
		}, err => {
			console.log(err);
		})
	}

}
