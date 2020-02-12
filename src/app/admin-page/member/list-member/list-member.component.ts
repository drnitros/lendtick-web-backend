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
	public data:any = [];
	public columns:any = [];
	public display: boolean = false;
	public selectedColumns: any[];
	public loading: boolean;
	public selectedItem = null;
	public grades = [];
	public grades2 = [];
	public selectedGrade = null;
	public companies = [];
	public companies2 = [];
	public selectedCompany = null;
	public originGrades = [];
	public arrStatus = [];
	public arrReligion = [];
	public arrDomicile = [];
	public arrMariege = [];
	public arrRole = [];
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
	public widthDisplay: number;
	public roleId;
	public dataProfile = null;
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

	public imageID = null;
	public imageKTP = null;
	public imagePersonal = null;

	constructor(
		private messageService: MessageService,
		private memberService: MemberService
	) { }


	ngOnInit() {
		this.fetchUser();
		this.fetchDomicile();
		this.fetchMarriage();
		this.fetchReligion();
		this.fetchRole();
		this.fetchMasterDocumentType();
		this.roleId = localStorage.getItem('id_role_master');
		this.widthDisplay = 1200;

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

	// Convert Image
	// ========================= //
	private typeupload = null;
	handleInputChange(e,type) {
		var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
		var pattern = /image-*/;
		var reader = new FileReader();
		if(file != undefined){
			if (!file.type.match(pattern)) {
				alert('invalid format');
				return;
			}
		}

		this.typeupload = type;
		reader.onload = this._handleReaderLoaded.bind(this);
		reader.readAsDataURL(file);
	}
	_handleReaderLoaded(e,type) {
		let reader = e.target;
		switch(this.typeupload){
			case "company" :
				this.imgEmployee = reader.result;
			break;
			case "document" :
				this.imgDocument = reader.result;
			break;
		}
		
		setTimeout(() => { 
			window.dispatchEvent(new Event('resize')); 
		}, 500);
	}

	// Fetching User
	// ========================= //
	fetchUser(){
		this.loading = true;
		this.memberService.getListUser(this.start, this.pageLength, this.objFilter).subscribe(res =>{
			_.map(res['data'].data, (x,i)=>{
				x['number'] = i + 1;
				x.requested_date = moment(x.requested_date).format('DD-MM-YYYY');
				x.employee_starting_date = x.employee_starting_date ? moment(x.employee_starting_date).format('DD-MM-YYYY') : '-';
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
			if(err.status == 401) this.memberService.updateToken(err.error.data.token);
		});
	}
	paginate(e){
		this.start = e.page * this.pageLength;
		this.fetchUser();
	}

	// Select Item / User
	// ======================== //
	selectItem(e){
		this.loading = true;
		this.selectedItem = e;
		console.log(this.selectedItem);

		this.selectedItem.employee_starting_date = moment(this.selectedItem.employee_starting_date).format("DD MMM YYYY");
		this.memberService.getUserDetail(e.id_user).subscribe(res =>{
			this.dataProfile = res['data'];
			let findStatus = _.find(this.arrStatus, {value: res['data'].user.id_workflow_status});
			if(findStatus) res['data'].user.status_name = findStatus.label;

			let findReligion =  _.find(this.arrReligion, {id_religion: res['data'].profile.id_religion});
			if(findReligion) res['data'].profile.name_religion = findReligion.name_religion;
			
			let findMarriage = _.find(this.arrMariege, {id_marriage_status: res['data'].profile.id_marriage_status});
			if(findMarriage) res['data'].profile.marriage_status_name = findMarriage.marriage_status_name;

			let findDomicili = _.find(this.arrDomicile, {id_domicile_address_status: res['data'].profile.id_domicile_address_status});
			if(findDomicili) res['data'].profile.domicili_name = findDomicili.name_domicile_address_status;
			
			let findGrade = _.find(this.grades2, {value: res['data'].company.id_grade});
			if(findGrade) res['data'].company.grade_name = findGrade.label;
			
			setTimeout(()=>{
				let findRole = _.find(this.arrRole, {id_role_master: res['data'].user.id_role_master});
				if(findRole) res['data'].user.role_master_name = findRole.name_role_master;
				
				let findGradeSlary = _.find(this.grades2, {value: res['data'].salary.id_grade});
				if(findGradeSlary) res['data'].salary.salary_grade_name = findGradeSlary.label;

				this.selectedCompany2 = this.dataProfile.company.id_company;
				this.position = this.dataProfile.company.position;
				this.division = this.dataProfile.company.division;
				this.idEmployee = this.selectedItem.id_employee;
			}, 1000); 
			this.fetchSallary(e.id_user);
		});
	}
	tabChange(){
		setTimeout(() => { 
			window.dispatchEvent(new Event('resize')); 
		}, 100);
	}

	// Create Mutation Employee
	// ======================== //
	public isSubmitMutation: boolean = false;
	public idEmployee = null;
	public division = null;
	public position = null;
	public selectedCompany2 = null;
	public imgEmployee = null;
	createMutation(){
		this.isSubmitMutation = true;
		let obj = {
			id: this.selectedItem.id_user,
			id_employee: this.idEmployee,
			id_company: this.selectedCompany2,
			company_identity_photo: this.imgEmployee,
			division: this.division,
			position: this.position
		};
		console.log(obj);
		this.memberService.updateMutation(obj).subscribe(res =>{
			this.isSubmitMutation = false;
			this.messageService.add({severity:'success', summary: 'Success', detail:'Mutasi karyawan berhasil'});
			this.display = false;
			this.fetchUser();
		}, err =>{
			this.isSubmitMutation = false;
			this.messageService.add({severity:'error', summary: 'Error', detail:'Mutasi karyawan gagal, silakan coba lagi'});
		})
	}
	
	// Select Company Mutation Employee
	// ============================== //
	changeCompany2(e){
		this.selectedCompany2 = e.value;
	}

	// Fetch Salary
	// ============================ //
	fetchSallary(id){
		this.memberService.getSallary(id).subscribe(res =>{
			this.dataProfile['salary'] = res['data'];
			this.dataProfile['salary'].amount = Number(res['data'].salary_amount).toLocaleString();
			this.fetchBank(id);
		}, err =>{
			if(err.status == 401) this.memberService.updateToken(err.error.data.token);
		});
	}

	// Fetch Bank
	// ============================ //
	fetchBank(id){
		this.memberService.getBank(id).subscribe(res =>{
			this.dataProfile['bank'] = res['data'];
			this.fetchDocument(id);
		}, err =>{
			if(err.status == 401) this.memberService.updateToken(err.error.data.token);
		});
	}

	// Fetch Document
	// ============================ //
	public isViewDocument: boolean = false;
	public openTabDocument: boolean = false;
	public selectedDocument = null;
	public imgDocument = null;
	public isSubmitDocument: boolean = false;
	public arrDocumentType = [];
	public selectedDocumentType = null;
	public isUpdateDocument: boolean = false;

	fetchDocument(id){
		this.memberService.getDocument(id).subscribe(res =>{
			res['data'].map((x)=> {
				x['disable'] = false;
				x['document_name'] = _.find(this.arrDocumentType,{value: x.id_document_type}).label;
			});
			this.dataProfile['document'] = res['data'];
			this.display = true;
			this.loading = false;
			this.openTabDocument = false;
			setTimeout(() => { 
				window.dispatchEvent(new Event('resize')); 
			}, 100);
		}, err =>{
			if(err.status == 401) this.memberService.updateToken(err.error.data.token);
		});
	}
	removeDocument(e){
		this.selectedDocument = e;
		this.selectedDocument.disable = true;
		this.memberService.deleteDocument(Number(this.selectedDocument.id_user),this.selectedDocument.id_user_document).subscribe(res =>{
			this.fetchDocument(Number(this.selectedDocument.id_user));
			this.selectedDocument = null;
			this.messageService.add({severity:'success', summary: 'Success', detail:'Berhasil hapush dokumen'});
		}, err =>{
			this.selectedDocument.disable = false;
			this.messageService.add({severity:'error', summary: 'Error', detail:'Gagal hapush dokumen'});
		});
	}
	viewDocument(e){
		this.widthDisplay = 800;
		this.selectedDocument = e;
		this.isViewDocument = true;
		setTimeout(() => { 
			window.dispatchEvent(new Event('resize')); 
		}, 100);
	}
	closeViewDocument(){
		this.widthDisplay = 1200;
		this.isViewDocument = false;
		this.openTabDocument = true;
		setTimeout(() => { 
			window.dispatchEvent(new Event('resize')); 
		}, 100);
	}
	changeDocumentType(e){
		this.selectedDocumentType = e.value;
	}
	createDocument(){
		let obj = {
			id: this.selectedItem.id_user,
			id_document_type: this.selectedDocumentType,
			doc_photo: this.imgDocument
		};
		this.isSubmitDocument = true;

		if(this.isUpdateDocument){
			this.memberService.updateDocument(obj).subscribe(res =>{
				this.isSubmitDocument = false;
				this.fetchDocument(this.selectedItem.id_user);
				this.messageService.add({severity:'success', summary: 'Success', detail:'Berhasil tambah dokumen'});
				this.cancelUpdateDoc();
			}, err =>{
				this.isSubmitDocument = false;
				this.messageService.add({severity:'error', summary: 'Error', detail:'Gagal tambah dokumen'});
			});
		}else{
			this.memberService.postDocument(obj).subscribe(res =>{
				this.isSubmitDocument = false;
				this.fetchDocument(this.selectedItem.id_user);
				this.messageService.add({severity:'success', summary: 'Success', detail:'Berhasil tambah dokumen'});
			}, err =>{
				this.isSubmitDocument = false;
				this.messageService.add({severity:'error', summary: 'Error', detail:'Gagal tambah dokumen'});
			});
		}
		
	}
	editDocument(e){
		this.isUpdateDocument = true;
		this.selectedDocumentType = e.id_document_type;
		this.imgDocument = e.path;
	}
	cancelUpdateDoc(){
		this.isUpdateDocument = false;
		this.imgDocument = null;
	}
	
	// Fetch Master 
	// ========================= //
	fetchCompany(){
		this.memberService.getCompany().subscribe(res =>{
			this.companies = [{label:"Semua Perusahaan",value: null}];
			_.map(res['data'],(x)=>{
				this.companies.push({label:x.name_company, value:x.id_company});
			});
		}, err =>{
			if(err.status == 401) this.memberService.updateToken(err.error.data.token);
		});

		this.memberService.getCompany2().subscribe(res =>{
			_.map(res['data'],(x)=>{
				this.companies2.push({label:x.name_company, value:x.id_company});
			});
		}, err =>{
			if(err.status == 401) this.memberService.updateToken(err.error.data.token);
		});
	}
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
			if(err.status == 401) this.memberService.updateToken(err.error.data.token);
		});
	}
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
			if(err.status == 401) this.memberService.updateToken(err.error.data.token);
		});
	}
	fetchDomicile(){
		this.memberService.getDomicile().subscribe(res =>{
			this.arrDomicile = res['data'];
		}, err =>{
			if(err.status == 401) this.memberService.updateToken(err.error.data.token);
		});
	}
	fetchReligion(){
		this.memberService.getReligion().subscribe(res =>{
			this.arrReligion = res['data'];
		}, err =>{
			if(err.status == 401) this.memberService.updateToken(err.error.data.token);
		});
	}
	fetchMarriage(){
		this.memberService.getMarriage().subscribe(res =>{
			this.arrMariege = res['data'];
		}, err =>{
			if(err.status == 401) this.memberService.updateToken(err.error.data.token);
		});
	}
	fetchRole(){
		this.memberService.getRole().subscribe(res =>{
			this.arrRole = res['data'];
		}, err =>{
			if(err.status == 401) this.memberService.updateToken(err.error.data.token);
		});
	}
	fetchMasterDocumentType(){
		this.memberService.getMstDocument().subscribe(res =>{
			_.map(res['data'], (x)=>{
				let obj = {label:x.document_name,value:x.id_document_type};
				this.arrDocumentType.push(obj);
			});
			this.selectedDocumentType = this.arrDocumentType[0].value;
		}, err =>{
			if(err.status == 401) this.memberService.updateToken(err.error.data.token);
		});
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
