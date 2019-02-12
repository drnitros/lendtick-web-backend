import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../member/member.service';

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
	public data:any = [];
	public columns:any = [];
	public display: boolean = false;
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
		private messageService: MessageService,
		private memberService: MemberService
	) { }


	ngOnInit() {
		this.fetchUser();
		this.fetchGrade();
		this.fetchLoan();

		this.columns = [
			{field: 'id', header: 'No', show:true},
			{field: 'name', header: 'Nama Anggota', show:true},
			{field: 'nik', header: 'NIK', show:true},
			{field: 'name_company', header: 'Company', show:true},
			{field: 'name_grade', header: 'Golongan', show:true},
			{field: 'loan_type', header: 'Tipe Pinjaman', show:true},
			{field: 'loan_value', header: 'Jumlah Pinjaman', show:true},
			{field: 'tenor', header: 'Tenor', show:true},
			{field: 'bunga', header: 'Bunga', show:true},
			{field: 'date', header: 'Tanggal Pengajuan', show:true},
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
		this.memberService.getAprrovalUser(0).subscribe(res =>{
			console.log(res);
			// this.data = res['data'].data;

			this.data = [{
				id: 1,
				name: "Adam Jordan",
				nik: 32342323,
				name_company: "Toyota",
				name_grade: "IV",
				loan_type: "Multiguna",
				loan_value: "Rp 75.000.000",
				tenor: 60,
				bunga: 7,
				date: "27 Januari 2018"
			},{
				id: 2,
				name: "Asep Sumarna",
				nik: 42342343,
				name_company: "Toyota",
				name_grade: "IV",
				loan_type: "Middle Loan",
				loan_value: "Rp 5.000.000",
				tenor: 12,
				bunga: 8,
				date: "20 Januari 2018"
			}];
			this.loading = false;
		}, err=>{
			console.log(err);
			// this.fetchUser();
			this.loading = false;
		});
	}

	// Select Item / User
	// ======================== //
	selectItem(e){
		this.display = true;
		this.selectedItem = e;
	}

	// Fetch Grade 
	// ========================= //
	fetchGrade(){
		this.memberService.getGrade().subscribe(res =>{
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
	fetchLoan(){
		this.memberService.getCompany().subscribe(res =>{
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
