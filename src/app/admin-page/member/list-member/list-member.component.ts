import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';

import { MessageService } from 'primeng/components/common/messageservice';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.scss'],
  providers: [MessageService]
})
export class ListMemberComponent implements OnInit {
	public data:any = this.data = [];
	public columns:any = [];
	public display: boolean = false;
	public selectedColumns: any[];
	public loading: boolean;
	public selectedItem = null;
	public grades = [];
	public grades2 = [];
	public selectedGrade = null;
	public companies = [];
	public originGrades = [];
	public arrStatus = [];
	public selectedStatus = null;
	public date: Date = null;
	public date1: Date = null;
	public date2: Date = null;
	public minDate = moment().add('days',-1)['_d'];
	public isSubmitApprove: boolean = false;
	public isSubmitReject: boolean = false;
	public totalCount: number = 0;
	public start = 0;
	public pageLength = 10;
	public availabelColumn: Number;
	private objFilter = {};

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

		this.columns = [
			{field: 'number', header: 'No', show:true},
			{field: 'name', header: 'Nama', show:true},
			{field: 'name_company', header: 'Perusahaan', show:true},
			{field: 'id_employee', header: 'NIK', show:true},
			{field: 'email', header: 'Email', show:false},
			{field: 'phone_number', header: 'No Telpon', show:false},
			{field: 'employee_starting_date', header: 'Tgl Masuk', show:true},
			{field: 'requested_date', header: 'Tgl Pengajuan', show:true},
			{field: 'name_grade', header: 'Golongan', show:false},
			{field: 'status_name', header: 'Status', show:true},
		];
		this.availabelColumn = _.filter(this.columns, {show: true}).length + 1;
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
		}
		this.availabelColumn = _.filter(this.columns, {show: true}).length + 1;
		this.selectedColumns = _.filter(this.columns,{show:true});
	}

	// Fetching User
	// ========================= //
	fetchUser(){
		this.loading = true;
		this.memberService.getListUser(this.start, this.pageLength, this.objFilter).subscribe(res =>{
			_.map(res['data'].data, (x,i)=>{
				x['number'] = i + 1;
				x.requested_date = moment(x.requested_date).format('YYYY-MM-DD');
				x.employee_starting_date = moment(x.employee_starting_date).format('YYYY-MM-DD');
			});
			this.data = res['data'].data;
			this.totalCount = Number(res['data'].count_filter);
			this.loading = false;
			this.fetchGrade();
			this.fetchCompany();
			this.fetchStatus();
		}, err=>{
			this.fetchUser();
			this.loading = false;
		});
	}
	paginate(e){
		this.start = e.page * this.pageLength;
		this.fetchUser();
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

	// Fetch Grade 
	// ========================= //
	fetchGrade(){
		this.memberService.getGrade().subscribe(res =>{
			this.originGrades = res['data'];
			this.grades = [{label:"Semua Golongan",value:null}];
			this.grades2 = [];
			_.map(res['data'], (x)=>{
				let obj = {label:x.name_grade,value:x.id_grade};
				this.grades.push(obj);
				this.grades2.push(obj);
			});
		}, err =>{
			this.fetchGrade();
		});
	}

	// Fetch Status 
	// ========================= // 
	fetchStatus(){
		this.memberService.getStatus().subscribe(res =>{
			this.arrStatus = [{label:"Semua Status",value:null}];
			_.map(res['data'], (x)=>{
				let obj = {label:x.workflow_status_name,value:x.id_workflow_status};
				this.arrStatus.push(obj);
			});

			_.map(this.data, (x)=>{
				x['status_name'] = _.find(this.arrStatus, {value: x.id_workflow_status}).label;
			});
		}, err =>{
			this.fetchStatus();
		});
	}

	// Fetch Company 
	// ========================= //
	fetchCompany(){
		this.memberService.getCompany().subscribe(res =>{
			this.companies = [{label:"Semua Perusahaan",value: null}];
			_.map(res['data'],(x)=>{
				this.companies.push({label:x.name_company, value:x.id_company});
			});
		}, err =>{
			this.fetchCompany();
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

	// Filter List
	// ========================== //
	private typingTimer;
	private doneTypingInterval = 1000;
	onSearchName(searchValue : string ) {  
		clearTimeout(this.typingTimer);
		this.typingTimer = setTimeout(()=>{
			if(searchValue){
				this.objFilter['nama'] = searchValue;
			}else{
				delete this.objFilter['nama'];
			}
			this.start = 0;
			this.fetchUser();
		}, this.doneTypingInterval);
	}
	onSearchNik(searchValue : string ) {  
		clearTimeout(this.typingTimer);
		this.typingTimer = setTimeout(()=>{
			if(searchValue){
				this.objFilter['no_anggota'] = searchValue;
			}else{
				delete this.objFilter['no_anggota'];
			}
			this.start = 0;
			this.fetchUser();
		}, this.doneTypingInterval);
	}
	changeCompany(e){
		if(e.value){
			this.objFilter['company'] = e.value;
		}else{
			delete this.objFilter['company'];
		}
		this.start = 0;
		this.fetchUser();
	}
	changeGrade(e){
		if(e.value){
			this.objFilter['golongan'] = e.value;
		}else{
			delete this.objFilter['golongan'];
		}
		this.start = 0;
		this.fetchUser();
	}
	changeStatus(e){
		if(e.value){
			this.objFilter['status'] = e.value;
		}else{
			delete this.objFilter['status'];
		}
		this.start = 0;
		this.fetchUser();
	}
	onSelectTglMasuk(e){
		if(this.date1[1]){
			let date1 = moment(this.date1[0]).format("YYYY-MM-DD");
			let date2 = moment(this.date1[1]).format("YYYY-MM-DD");
			this.objFilter['tgl_masuk'] = "2019-02-01 - 2019-02-15";		
		}else{
			delete this.objFilter['tgl_masuk'];
		}
		this.start = 0;
		this.fetchUser();
	}
	onSelectTglPengajuan(e){
		if(this.date2[1]){
			let date1 = moment(this.date2[0]).format("YYYY-MM-DD");
			let date2 = moment(this.date2[1]).format("YYYY-MM-DD");
			this.objFilter['tgl_pengajuan'] = "2019-02-01 - 2019-02-15";		
		}else{
			delete this.objFilter['tgl_pengajuan'];
		}
		this.start = 0;
		this.fetchUser();
	}
}
