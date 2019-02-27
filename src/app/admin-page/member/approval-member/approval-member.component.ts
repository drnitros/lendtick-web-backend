import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';

import { MessageService } from 'primeng/components/common/messageservice';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-approval-member',
  templateUrl: './approval-member.component.html',
  styleUrls: ['./approval-member.component.scss'],
  providers: [MessageService]
})
export class ApprovalMemberComponent implements OnInit {
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
	private objFilter = {};

	public arrStatus = [
		{label:"All",value: null},
		{label:"Menunggu pembayaran",value:"a"},
		{label:"Menunggu Approval HR",value:"b"},
		{label:"Menunggu Approval Keanggotaan",value:"c"},
	];
	public selectedStatus = null;

	public displayForm: boolean = false;
	public isSubmitRegis: boolean = false;

	public name;
	public company;
	public email;
	public identity_photo;
	public company_identity_photo;
	public personal_photo;
	public phone_number;

	constructor(
		private messageService: MessageService,
		private memberService: MemberService
	) { }


	ngOnInit() {
		this.fetchUser();
		this.fetchGrade();
		this.fetchCompany();

		this.columns = [
			{field: 'number', header: 'No', show:true},
			{field: 'name', header: 'Nama Anggota', show:true},
			{field: 'name_company', header: 'Company', show:true},
			{field: 'id_register_member_flow', header: 'NIK', show:true},
			{field: 'email', header: 'Email', show:false},
			{field: 'phone_number', header: 'No Telpon', show:false},
			{field: 'employee_starting_date', header: 'Tanggal Masuk', show:true},
			{field: 'name_grade', header: 'Golongan', show:false},
			{field: 'id_workflow_status', header: 'Status Request', show:true},
			{field: 'approve_at', header: 'Request Date', show:false},
		]
		this.selectedColumns = _.filter(this.columns,{show:true});
	}

	// Save
	// ========================= //
	save(e){
		this.isSubmitRegis = true;
		e['identity_photo'] = this.imageID.imageSrc;
		e['company_identity_photo'] = this.imageKTP.imageSrc;
		e['personal_photo'] = this.imagePersonal.imageSrc;
		e['role'] = 'ROLE001';

		this.memberService.postUser(e).subscribe(res =>{
			this.isSubmitRegis = false;
			this.displayForm = false;
			this.fetchUser();
			this.messageService.add({severity:'success', summary: 'Success', detail:'User ha been added'});
		}, err =>{
			this.isSubmitRegis = false;
			this.messageService.add({severity:'error', summary: 'Error', detail:'Please try again'});
		})
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
		this.memberService.getAprrovalUser(0, this.objFilter).subscribe(res =>{
			console.log(res);
			_.map(res['data'].data, (x,i)=>{
				x['number'] = i + 1;
			});
			this.data = res['data'].data;
			console.log(this.data);
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
		console.log(e);
		setTimeout(() => { 
			window.dispatchEvent(new Event('resize')); 
		}, 500);
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

	// Add New Member
	// ========================= //
	openDialogForm(){
		this.displayForm = true;
		setTimeout(() => { 
			window.dispatchEvent(new Event('resize')); 
		}, 500);
	}

	public imageKTP: any = {};
	public imageID: any = {};
	public imagePersonal: any = {};
	private uploadType: string;
	handleInputChange(e,type) {
		var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
		var pattern = /image-*/;
		var reader = new FileReader();
		console.log(file,reader);
		if(file != undefined){
			if (!file.type.match(pattern)) {
				alert('invalid format');
				return;
			}

			this.uploadType = type;
		}
		reader.onload = this._handleReaderLoaded.bind(this);
		reader.readAsDataURL(file);

		switch(this.uploadType){
			case "ktp" : this.imageKTP['imageName'] = file.name; break;
			case "id" : this.imageID['imageName'] = file.name; break;
			case "personal" : this.imagePersonal['imageName'] = file.name; break;
		}
	}
	_handleReaderLoaded(e) {
		let reader = e.target;
		switch(this.uploadType){
			case "ktp" : this.imageKTP['imageSrc'] = reader.result; break;
			case "id" : this.imageID['imageSrc'] = reader.result; break;
			case "personal" : this.imagePersonal['imageSrc'] = reader.result; break;
		}

		setTimeout(() => { 
			window.dispatchEvent(new Event('resize')); 
		}, 500);
	}

}
