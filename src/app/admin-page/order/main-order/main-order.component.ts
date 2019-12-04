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
	public sendDate1: String = ''
	public sendDate2: String = ''
	public date2: Date = null;
	public start = 1;
	public pageLength = 10;

	public arrStatus = [
		{label:"All",value: ""},
		{label:"CheckOut",value:"ODSTS00"},
		{label:"Waiting for Payment",value:"ODSTS00"},
		{label:"Paid Order",value:"ODSTS02"},
		{label:"Waiting for Delivery",value:"ODSTS03"},
		{label:"On Delivery",value:"ODSTS04"},
		{label:"Receive",value:"ODSTS05"},
		{label:"Cancel",value:"ODSTS99"},
	];
	public selectedStatus = "";

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
		this.orderService.getHistoryOrder(this.start, this.pageLength, this.selectedStatus, this.sendDate1, this.sendDate2).subscribe(res =>{
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
			// this.objFilter['id_workflow_status'] = e.value;
			this.selectedStatus = e.value;
		}else{
			// delete this.objFilter['id_workflow_status'];
			this.selectedStatus = e.value;
		}
		this.start = 0;
		this.fetchData();
	}
	onSelectBillingStart(e){
		if(this.date1){
			let date1 = moment(this.date1).format("YYYY-MM-DD");
			this.sendDate1 = date1;
		}else{
			this.date1 = null
			this.sendDate1 = ''
		}
		this.start = 0;
		this.fetchData();
	}
	onSelectBillingEnd(e){
		if(this.date2){
			let date2 = moment(this.date2).format("YYYY-MM-DD");
			this.sendDate2 = date2;		
		}else{
			this.date2 = null
			this.sendDate2 = ''
		}
		this.start = 0;
		this.fetchData();
	}
}
