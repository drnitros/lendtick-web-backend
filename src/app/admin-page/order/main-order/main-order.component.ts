import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { OrderService } from '../order.service';
import * as _ from 'lodash';
import * as moment from 'moment';

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
	public date: Date = null;
	public date1: Date = null;
	public date2: Date = null;
	public start = 0;
	public pageLength = 10;

	public arrStatus = [
		{label:"All",value: null},
		{label:"Menunggu pembayaran",value:"a"},
		{label:"Menunggu Approval HR",value:"b"},
		{label:"Menunggu Approval Keanggotaan",value:"c"},
	];
	public selectedStatus = null;

	constructor(
		private orderService: OrderService,
		private router: Router
	) { }


	ngOnInit() {
		this.fetchData();
		this.fetchCompany();

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
		this.orderService.getHistoryOrder(this.start, this.pageLength, this.objFilter).subscribe(res =>{
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

	// Fetch Company 
	// ========================= //
	fetchCompany(){
		this.orderService.getCompany().subscribe(res =>{
			this.companies = [];
			_.map(res['data'],(x)=>{
				this.companies.push({label:x.name_company, value:x.id_company});
			});
		}, err =>{
			console.log(err);
			// this.fetchLoan();
		});
	}

	// Filter List
	// ========================== //
	changeCompany(e){
		if(e.value){
			this.objFilter['company'] = e.value;
		}else{
			delete this.objFilter['company'];
		}
		this.start = 0;
		this.fetchData();
	}
	changeStatus(e){
		if(e.value){
			this.objFilter['status'] = e.value;
		}else{
			delete this.objFilter['status'];
		}
		this.start = 0;
		this.fetchData();
	}
	onSelectBillingStart(e){
		if(this.date1){
			let date1 = moment(this.date1 ).format("YYYY-MM-DD");
			let date2 = moment(this.date2).format("YYYY-MM-DD");
			this.objFilter['billing_date_start'] = date1.toString();
			this.objFilter['billing_date_end']	= date2.toString();	
			console.log(this.objFilter);
		}else{
			delete this.objFilter['billing_date_start'];
			delete this.objFilter['billing_date_end'];
		}
		this.start = 0;
		this.fetchData();
	}
	onSelectBillingEnd(e){
		if(this.date2){
			let date1 = moment(this.date1).format("YYYY-MM-DD");
			let date2 = moment(this.date2).format("YYYY-MM-DD");
			this.objFilter['billing_date_start'] = date1;
			this.objFilter['billing_date_end']	= date2;		
		}else{
			delete this.objFilter['billing_date_start'];
			delete this.objFilter['billing_date_end'];
		}
		this.start = 0;
		this.fetchData();
	}
}
