import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-sync-product',
  templateUrl: './sync-product.component.html',
  styleUrls: ['./sync-product.component.scss']
})
export class SyncProductComponent implements OnInit {
	// Properties
	// ====================== //
	public data = [];
	public loading: boolean = true;
	public products = [];
	public selectedProduct: string;

	constructor(
		private productService: ProductService
	) { }

	ngOnInit() {
		this.fetchProduct(0,1);
		
		this.products = [
            {label: 'Bukalapak', value: 'Bukalapak'},
            {label: 'Blibli', value: 'Blibli'},
            {label: 'JD.ID', value: 'JD.ID'},
        ];
	}

	fetchProduct(limit,offset){
		this.productService.getChanelProduct(limit,offset).subscribe(res =>{
			this.customProduct(res['data']);
			this.data = res['data'];
			this.loading = false;
			console.log(this.data);
		}, err => {
			console.log(err);
		})
	}

	customProduct(data){
		_.map(data, (x)=>{
			x.basicPrice = Number(x.price.base_price).toLocaleString();
			x.description = x.desc.val;
			_.map(x.assets.imgs, (y)=>{
				y.img.src = y.img.src.replace(' =>',':');
				x.mainImage = y.img.src;
			});
		});
	}

}
