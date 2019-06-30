import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { OrderService } from '../order.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-main-order',
  templateUrl: './main-order.component.html',
  styleUrls: ['./main-order.component.scss']
})
export class MainOrderComponent implements OnInit {
	private objFilter = {};
	public data:any = [];
	public columns:any = [];
	public selectedColumns: any[];
	public loading: boolean;
	public selectedItem = null;
	public companies = [];
	public display = false;

	constructor(
		private orderService: OrderService,
		private router: Router
	) { }


	ngOnInit() {
		this.fetchData();

		this.columns = [
			{field: 'number', header: 'No', show:true},
			{field: 'id_employee', header: 'Id Karyawan', show:true},
			{field: 'id_koperasi', header: 'Id Koperasi', show:true},
			{field: 'id_order', header: 'Id Order', show:true},
			{field: 'name', header: 'Nama Anggota', show:true},
			{field: 'name_company', header: 'Perusahaan', show:true},
			{field: 'name_payment_type', header: 'Tipe Pembayaran', show:true},
			{field: 'total_billing', header: 'Total Tagihan', show:true},
		]
		this.selectedColumns = _.filter(this.columns,{show:true});
	}

	// Toggle Columns 
	// ====================== //
	changeColumn(e){
		let find = _.find(this.columns, e.itemValue);
		if(e.itemValue != undefined){
			if(e.itemValue.show){
				find.show = false;
			}else{
				find.show = true;
			}
		}else{
			
		}
		this.selectedColumns = _.filter(this.columns,{show:true});
	}

	// Fetching Data
	// ========================= //
	fetchData(){
		this.loading = true;
		this.orderService.getHistoryOrder().subscribe(res =>{
			_.map(res['data'].data, (x,i)=>{
				x['number'] = i + 1;

				x.order_detail.map((y)=>{
					y.base_price = y.base_price.toLocaleString();
					y.base_price = y.sell_price.toLocaleString();
				});
			});
			this.data = res['data'];
			this.loading = false;
		}, err =>{
			this.loading = false;
			if(err.status == 401) this.orderService.updateToken(err.error.data.token);
		});
	}

	selectItem(e){
		this.display = true;
		this.selectedItem = e.order_detail[0];
	}
}
