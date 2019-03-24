import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MemberService } from '../../member/member.service';
import * as _ from 'lodash';

@Component({
	selector: 'app-voucher',
	templateUrl: './voucher.component.html',
	styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
	public data:any = [{
		number: 1,
		id_voucher: "42434234",
		voucher_code: "VOU-001",
		expire_date: "27 January 2020",
		created_date: "21 March 2019",
		created_by: "Wulung Tresno",
		status: true,
	},{
		number: 2,
		id_voucher: "42434235",
		voucher_code: "VOU-002",
		expire_date: "27 Februaru 2020",
		created_date: "22 March 2019",
		created_by: "Rendy Wijanarko",
		status: false,
	},{
		number: 3,
		id_voucher: "42434236",
		voucher_code: "VOU-003",
		expire_date: "29 January 2020",
		created_date: "25 October 2019",
		created_by: "Wulung Tresno",
		status: true,
	}];
	public columns:any = [];
	public selectedColumns: any[];
	public loading: boolean;
	public selectedItem = null;
	public date: Date = null;
	public displaynew: boolean = false;
	public amount = 1;

	public loanType = [
		{label:"Semua Tipe Loan", value: null},
		{label:"Multiguna", value: '21'},
		{label:"Multigriya", value: '22'},
		{label:"Middle Loan", value: '23'},
	];
	public selectedLoan = null;

	public arrStatus = [
		{label:"Semua Status", value: null},
		{label:"Aktif", value: '1'},
		{label:"Tidak Aktif", value: '0'},
	];
	public selectedStatus = null;

	public arrUser = [
		{label:"Semua Pembuat", value: null},
		{label:"Rendy Wijanarko", value: '1'},
		{label:"Wulung Tresno", value: '0'},
	];
	public selectedCreated = null;

	public display = false;

	constructor(
		private memberService: MemberService,
		private router: Router
	) { }


	ngOnInit() {
		this.fetchUser();

		this.columns = [
			{field: 'number', header: 'No', show:true},
			{field: 'id_voucher', header: 'Id Voucher', show:false},
			{field: 'voucher_code', header: 'Voucher Code', show:true},
			{field: 'expire_date', header: 'Expire Date', show:true},
			{field: 'created_by', header: 'Created By', show:true},
			{field: 'status', header: 'Voucher Status', show:true},
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

	// Fetching User
	// ========================= //
	fetchUser(){
		this.loading = true;
		setTimeout(()=>{
			this.loading = false;
		}, 3000);
	}

	// Select Item / User
	// ======================== //
	selectItem(e){
		this.display = true;
		this.selectedItem = e;
		setTimeout(() => { 
			window.dispatchEvent(new Event('resize')); 
		}, 500);
	}
}
