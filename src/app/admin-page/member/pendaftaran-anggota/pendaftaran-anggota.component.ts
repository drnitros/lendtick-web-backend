import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';

import { MessageService } from 'primeng/components/common/messageservice';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-pendaftaran-anggota',
  templateUrl: './pendaftaran-anggota.component.html',
  styleUrls: ['./pendaftaran-anggota.component.scss'],
  providers: [MessageService]
})
export class PendaftaranAnggotaComponent implements OnInit {
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
	public minDate = moment().add('days',-1)['_d'];
	public isSubmitApprove: boolean = false;
	public isSubmitReject: boolean = false;

	constructor(
		private messageService: MessageService,
		private memberService: MemberService
	) { }


	ngOnInit() {
		this.fetchUser();
		this.fetchGrade();
		this.fetchCompany();

		this.columns = [
			{field: 'name', header: 'Nama Lengkap', show:true},
			{field: 'name_company', header: 'Company', show:true},
			{field: 'email', header: 'Email', show:true},
			{field: 'phone_number', header: 'No Telpon', show:true},
			{field: 'id_register_member_flow', header: 'NRP Karyawan', show:true},
			{field: 'name_grade', header: 'Golongan', show:true},
			{field: 'id_workflow_status', header: 'Status Request', show:true},
			{field: 'employee_starting_date', header: 'Join Date', show:true},
			{field: 'approve_at', header: 'Request Date', show:true},

			// {field: 'approve_at', header: 'Approve At', show:true},
			// {field: 'approve_by', header: 'Approve By', show:true},
			// {field: 'authorization_company', header: 'Authorization Company', show:true},
			// {field: 'id_master_register_member_flow', header: 'ID Master Register Member Flow', show:false},
			// {field: 'id_register_member_flow', header: 'ID Register Member Flow', show:true},
			// {field: 'id_role_master', header: 'ID Role Master', show:true},
			// {field: 'id_user', header: 'ID User', show:true},
			// {field: 'level', header: 'Level', show:false},
			// {field: 'send_email_to_member', header: 'Send Email to Member', show:false},
			// {field: 'send_email_to_role', header: 'Send Email to Role', show:false},
			// {field: 'set_workflow_status_code', header: 'Set Workflow Status Code', show:false}
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
			this.data = res['data'].data;
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

		console.log(this.selectedGrade);
		console.log(e);
		console.log(this.grades);
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
	fetchCompany(){
		this.memberService.getCompany().subscribe(res =>{
			this.companies = [];
			_.map(res['data'],(x)=>{
				this.companies.push({label:x.name_company, value:x.id_company});
			});
		}, err =>{
			console.log(err);
			// this.fetchCompany();
		});
	}

	// Approve User
	// ========================= //
	approve(){
		this.isSubmitApprove = true;
		let body = {
			id: Number(this.selectedItem['id_user']),
			grade: this.selectedGrade,
			date_in: moment(this.date).format('YYYY-MM-DD hh:mm:ss'),
		};
		this.memberService.putApproveUser(body).subscribe(res =>{
			this.display = false;
			this.isSubmitApprove = false;
			this.fetchUser();
			this.messageService.add({severity:'success', summary: 'Success', detail:'User ha been approved'});
		}, err =>{
			this.isSubmitApprove = false;
			this.messageService.add({severity:'error', summary: 'Error', detail:'Please try again'});
		});
	}

	// Reject User
	// ========================= //
	reject(){
		this.isSubmitReject = true;
		this.memberService.putRejectUser({id: Number(this.selectedItem['id_user'])}).subscribe(res =>{
			this.display = false;
			this.isSubmitReject = false;
			this.fetchUser();
			this.messageService.add({severity:'success', summary: 'Success', detail:'User ha been rejected'});
		}, err =>{
			this.isSubmitReject = false;
			this.messageService.add({severity:'error', summary: 'Error', detail:'Please try again'});
		});
	}
}