import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { MemberService } from '../../member/member.service';
import { MasterService } from '../master.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-loan-type',
  templateUrl: './loan-type.component.html',
  styleUrls: ['./loan-type.component.scss']
})
export class LoanTypeComponent implements OnInit {
	public data:any = [];
	public columns:any = [];
	public selectedColumns: any[];
	public loading: boolean;
	public selectedItem = null;
	public companies = [];
	public display = false;

	constructor(
		private memberService: MemberService,
		private masterService: MasterService,
		private router: Router
	) { }


	ngOnInit() {
		this.fetchLoanType();
		this.fetchCompany();

		this.columns = [
			{field: 'number', header: 'No', show:true},
			{field: 'name_loan_type', header: 'Tipe Pinjaman', show:true},
			{field: 'interest_effective', header: 'Interest Effective', show:true},
			{field: 'interest_flat', header: 'Interest Flat', show:true},
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

	// Fetching Loan Type
	// ========================= //
	fetchLoanType(){
		this.loading = true;
		this.masterService.getLoanType().subscribe(res =>{
			_.map(res['data'], (x,i)=>{
				x['number'] = i + 1;
			});
			this.data = res['data'];
			this.loading = false;
		});
	}

	// Fetch Company 
	// ========================= //
	fetchCompany(){
		this.memberService.getCompany().subscribe(res =>{
			this.companies = [{label:"Semua Perusahaan",value:null}];
			_.map(res['data'],(x)=>{
				this.companies.push({label:x.name_company, value:x.id_company});
			});
		});
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
