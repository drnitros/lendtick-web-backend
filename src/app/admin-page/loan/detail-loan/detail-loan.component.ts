import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { MemberService } from '../../member/member.service';
import { LoanService } from '../loan.service';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
	selector: 'app-detail-loan',
	templateUrl: './detail-loan.component.html',
	styleUrls: ['./detail-loan.component.scss'],
	providers: [MessageService]
})
export class DetailLoanComponent implements OnInit {
	public loadingData: boolean = true;
	public loan_type;
	public id_user;
	public id_loan;
	public date: Date = null;
	public bunga: number = 1;
	public isPopupVisible: boolean;
	public isPopupReject: boolean;
	public formAddLoan:FormGroup;
	public formReject:FormGroup;
	public tipePinjaman = [
		{id:'multi_guna',title:'Multi Guna'},
		{id:'pendidikan',title:'Pendidikan'},
		{id:'cicilan_hrd',title:'Cicilan HRD-1'}
	];
	public golonganPinjaman = [
		{id:'1',title:'I'},
		{id:'2',title:'II'},
		{id:'3',title:'III'},
		{id:'4',title:'IV'}
	];
	golongan = {id:'1',title:'I'};

	// Member variable
	public data:any = this.data = [];
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
	public arrlanNonCoperative = [];
	public selectedStatus = null;
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
		private route: ActivatedRoute, 
		private router: Router, 
		private memberService: MemberService, 
		private messageService: MessageService,
		private loanService: LoanService
	){ }

	ngOnInit() {
		this.route.queryParamMap.subscribe(queryParams => {
			this.loan_type = queryParams.get("type");;
			this.id_user = queryParams.get("user");
			this.idEmployee = queryParams.get("idemployee");
		});
		this.route.params.subscribe(params => {
			this.id_loan = params['id'];
		});
		this.widthDisplay = 1200;
		this.fetchProfileDetail();
		this.fetchDomicile();
		this.fetchMarriage();
		this.fetchReligion();
		this.fetchRole();
		this.fetchMasterDocumentType();
		this.fetchGrade();
		this.fetchStatus();
		this.fetchLoanNoncoperative();
		this.fetchLoanDetail(this.id_user,this.id_loan);
		this.fetchDocumentLoan(this.id_user,this.loan_type);
	}

	// Fetch Loan Detail
	// ======================== //
	public dataDetailLoan = null;
	fetchLoanDetail(idUser,idLoan){	
		this.loanService.getLoadDetail(idUser,idLoan).subscribe(res =>{
			console.log(res);
			this.dataDetailLoan = res['data'];
			this.dataDetailLoan.rp_installments = 'Rp ' + this.dataDetailLoan.current_loan.installments.toLocaleString();
			this.dataDetailLoan.rp_loan_approved = 'Rp ' + this.dataDetailLoan.current_loan.loan_approved.toLocaleString();
			this.dataDetailLoan.rp_total_installment = 'Rp ' + this.dataDetailLoan.total_installment.toLocaleString();
			this.dataDetailLoan.rp_salary = 'Rp ' + this.dataDetailLoan.salary.toLocaleString();
			this.dataDetailLoan.rp_current_strength = 'Rp ' + this.dataDetailLoan.current_strength.toLocaleString();
			this.dataDetailLoan.rp_final_installment = 'Rp ' + this.dataDetailLoan.final_installment.toLocaleString();

			_.map(this.dataDetailLoan.active_loan,(x)=>{
				x.rp_installments = 'Rp ' + x.installments.toLocaleString();
				x.rp_loan_approved = 'Rp ' + x.loan_approved.toLocaleString();
				x.rp_paid_installment = 'Rp ' + x.paid_installment.toLocaleString();
				x.rp_unpaid_installment = 'Rp ' + x.unpaid_installment.toLocaleString();
				x.start_date = moment(x.start_date).format("DD MMM YYYY");
				x.end_date = moment(x.end_date).format("DD MMM YYYY");
			});
			this.loadingData = false;
			this.sallary = res['data'].salary;
			this.loading = false;
		});
	}

	// Document Loan
	// ========================== //
	public selectedDocumentLoan = null;
	public displayDocument: boolean = false;
	public isViewDocumentLoan: boolean = false;
	public arrDocumentDetailLoan = [];
	fetchDocumentLoan(idUser,loanType){
		this.loanService.getLoadDocument(idUser,loanType).subscribe(res =>{
			this.arrDocumentDetailLoan = res['data'];
		})
	};
	viewDocumentLoan(e){
		this.displayDocument = true;
		this.selectedDocumentLoan = e;
		this.isViewDocumentLoan = true;
		setTimeout(() => { 
			window.dispatchEvent(new Event('resize')); 
		}, 100);
	}
	closeViewDetailDocument(){
		this.isViewDocumentLoan = false;
		this.selectedDocumentLoan = null;
		setTimeout(() => { 
			window.dispatchEvent(new Event('resize')); 
		}, 1000);
	}

	// Select Item / User
	// ======================== //
	fetchProfileDetail(){
		this.loading = true;
		this.memberService.getUserDetail(this.id_user).subscribe(res =>{
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
			}, 1000); 
			this.fetchSallary(this.id_user);
			this.fetchCompany();
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
	public display: boolean = false;
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
		this.memberService.updateMutation(obj).subscribe(res =>{
			this.isSubmitMutation = false;
			this.messageService.add({severity:'success', summary: 'Success', detail:'Mutasi karyawan berhasil'});
			this.display = false;
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

				let find = _.find(this.arrDocumentType,{value: x.id_document_type});
				x['document_name'] = find ? find.label : null;
			});
			this.dataProfile['document'] = res['data'];
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

	// Update Password
	// ========================= //
	public password = null;
	public oldpassword = null;
	public confirmpassword = null;
	public isSubmitPassword: boolean = false;
	updatePassword(){
		let obj = {
			old_password: this.oldpassword,
			new_password: this.password
		};

		this.isSubmitPassword = true;
		this.memberService.updatePassword(obj).subscribe(res =>{
			this.isSubmitPassword = false;
			this.messageService.add({severity:'success', summary: 'Success', detail:'Berhasil ganti password'});
		}, err =>{
			this.isSubmitPassword = false;
			this.messageService.add({severity:'error', summary: 'Error', detail:'Gagal ganti password'});
		});
	}

	// Pinjaman Aktif non koperasi
	// ========================= //
	public selectedNonCoperate = null;
	public total_pinjaman = 0;
	public total_tagihan = 0;
	public mulai_pinjaman = new Date;
	public akhir_pinjaman = new Date;
	public loadingPostLoanCooperactive: boolean = false;

	saveLoanCooperative(){
		let obj = {
			id_user: this.id_user,
			id_type_pinjaman_non_koperasi: this.selectedNonCoperate,
			id_workflow_status: "MLTSTS07",
			amount_per_month: this.total_tagihan,
			amount_total: this.total_pinjaman,
			starting_date: moment(this.mulai_pinjaman).format('YYYY-MM-DD'),
			end_date: moment(this.akhir_pinjaman).format('YYYY-MM-DD')
		};
		this.loadingPostLoanCooperactive = true;
		this.loanService.postPostLoanNoncooperative(obj).subscribe(res =>{
			this.loadingPostLoanCooperactive = false;
			this.isPopupVisible = false;
			this.fetchLoanDetail(this.id_user,this.id_loan);
			this.fetchDocumentLoan(this.id_user,this.loan_type);
			this.messageService.add({severity:'success', summary: 'Success', detail:'Data pinjaman non koperasi berhasil disimpan.'});
		}, err =>{
			this.loadingPostLoanCooperactive = false;
			this.messageService.add({severity:'error', summary: 'Error', detail:'Data pinjaman non koperasi gagal disimpan., silakan coba lagi'});
		});
	}

	// Approve Loan
	// ========================= //
	public tanggal_pencairan = new Date;
	public discount = 1;
	public sallary = 1;
	public grade = 1;
	public loadingSubmitApprove: boolean = false;
	public loadingSubmitReject: boolean = false;

	submitApproveLoan(){
		let obj = {
			id_loan: this.id_loan,
			disbursement_date: moment(this.tanggal_pencairan).format('YYYY-MM-DD'),
			discount: this.discount
		};

		this.loadingSubmitApprove = true;
		this.loanService.putApproveLoan(obj).subscribe(res =>{
			this.loading = true;
			this.fetchLoanDetail(this.id_user,this.id_loan);
			this.fetchDocumentLoan(this.id_user,this.loan_type);
			this.loadingSubmitApprove = false;
			this.messageService.add({severity:'success', summary: 'Success', detail:'Pengajuan pinjaman berhasil disetujui.'});
		}, err =>{
			console.log(err);
			this.loadingSubmitApprove = false;
			this.messageService.add({severity:'error', summary: 'Error', detail:'Pengajuan pinjaman gagal disetujui, silakan coba lagi.'});
		});
	}
	submitApproveReject(){
		let obj = {
			id_loan: this.id_loan
		};
		this.loadingSubmitReject = true;
		this.loanService.putRejectLoan(obj).subscribe(res =>{
			this.loading = true;
			this.fetchLoanDetail(this.id_user,this.id_loan);
			this.fetchDocumentLoan(this.id_user,this.loan_type);
			this.loadingSubmitReject = false;
			this.isPopupReject = false;
			this.messageService.add({severity:'success', summary: 'Success', detail:'Pengajuan pinjaman berhasil ditolak.'});
		}, err =>{
			console.log(err);
			this.loadingSubmitReject = false;
			this.messageService.add({severity:'error', summary: 'Error', detail:'Pengajuan pinjaman gagal ditolak, silakan soba lagi.'});
		})
	}
	

	// Fetch Master 
	// ========================= //
	fetchCompany(){
		this.memberService.getCompany().subscribe(res =>{
			this.companies = [{label:"Semua Perusahaan",value: null}];
			_.map(res['data'],(x)=>{
				this.companies.push({label:x.name_company, value:x.id_company});
			});

			try{
				let findCompany = _.find(this.companies, {value: this.dataProfile.company.id_company});
				if(findCompany) this.dataProfile.company.company_name = findCompany.label;
				console.log(findCompany);
			}catch(err){
				console.log(err);
			}
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
	fetchLoanNoncoperative(){
		this.loanService.getNoncoperateLoan().subscribe(res =>{
			_.map(res['data'], (x)=>{
				let obj = {label:x.name_pinjaman_non_koperasi,value:x.id_type_pinjaman_non_koperasi};
				this.arrlanNonCoperative.push(obj);
			});
		});
	}
}
