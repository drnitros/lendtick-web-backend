import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from "@angular/router";
import { LoanService } from '../loan.service';
import { MessageService } from 'primeng/components/common/messageservice';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-microloan',
  templateUrl: './microloan.component.html',
  styleUrls: ['./microloan.component.scss'],
  providers: [MessageService]
})
export class MicroloanComponent implements OnInit {
	private objFilter = {};
	public data:any = [];
	public columns:any = [];
	public selectedColumns: any[];
	public loading: boolean;
	public selectedItem = null;
	public grades = [];
	public companies = [];
	public originGrades = [];
	public selectedGrade = null;
	public date: Date = null;
	public date1: Date = null;
	public date2: Date = null;
	public minDate = moment().add('days',-1)['_d'];
	public isSubmitApprove: boolean = false;
	public isSubmitReject: boolean = false;

	public loanTypes = [
		{label: "Semua tipe Loan", value: null},
		{label: "Microloan", value: 1},
		{label: "Middle Loan", value: 2},
	];
	public selectedLoan = null;

	public arrStatus = [
		{label:"All",value: null},
		{label:"Menunggu pembayaran",value:"a"},
		{label:"Menunggu Approval HR",value:"b"},
		{label:"Menunggu Approval Keanggotaan",value:"c"},
	];
	public selectedStatus = null;

	constructor(
		private loanService: LoanService,
		private router: Router
	) { }


	ngOnInit() {
		this.fetchLoan();
		this.fetchCompany();
		this.fetchGrade();

		this.columns = [
			{field: 'number', header: 'No', show:true},
			{field: 'name', header: 'Nama Anggota', show:true},
			{field: 'id_employee', header: 'NIK', show:true},
			{field: 'name_company', header: 'Company', show:true},
			{field: 'name_grade', header: 'Golongan', show:true},
			{field: 'name_loan_type', header: 'Tipe Pinjaman', show:true},
			{field: 'loan_approved', header: 'Jumlah Pinjaman', show:true},
			{field: 'term_monthly', header: 'Tenor', show:true},
			{field: 'interest', header: 'Bunga', show:true},
			{field: 'request_date', header: 'Tgl Pengajuan', show:true},
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
	fetchLoan(){
		this.loading = true;
		this.loanService.getLoan().subscribe(res =>{
			this.data = res['data'];

			_.map(this.data,(x,i)=>{
				x.number = i + 1;
				x.loan_approved = 'Rp ' + x.loan_approved.toLocaleString();
				x.request_date = moment(x.request_date).format("DD MMM YYYY");
			});
			this.loading = false;
		}, err=>{
			this.loading = false;
		});
	}

	// Select Item / User
	// ======================== //
	selectItem(e){
		this.router.navigate(['/main/loan/detail/' + e.id_loan], { queryParams: { type: e.approval_by, user:e.id_user } });
	}

	// Fetch Grade 
	// ========================= //
	fetchGrade(){
		this.loanService.getGrade().subscribe(res =>{
			this.originGrades = res['data'];
			this.grades = [];
			_.map(res['data'], (x)=>{
				let obj = {label:x.name_grade,value:x.id_grade};
				this.grades.push(obj);
			});
		}, err =>{
			// this.fetchGrade();
			console.log(err);
		});
	}

	// Fetch Company 
	// ========================= //
	fetchCompany(){
		this.loanService.getCompany().subscribe(res =>{
			this.companies = [];
			_.map(res['data'],(x)=>{
				this.companies.push({label:x.name_company, value:x.id_company});
			});
		}, err =>{
			console.log(err);
			// this.fetchLoan();
		});
	}
}
