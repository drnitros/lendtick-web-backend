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
	public data:any = this.data = [{
		"id": 1,
		"name": "Gregorius Redford",
		"name_company": "Fatz",
		"email": "gredford0@4shared.com",
		"phone_number": "190-786-5613",
		"id_register_member_flow": "e24ed149-1f02-409b-91a9-e7585fd434ea",
		"name_grade": 1,
		"id_workflow_status": "Menunggu Approval Keanggotaan",
		"employee_starting_date": "5/5/2018",
		"approve_at": "7/26/2018",
	  }, {
		"id": 2,
		"name": "Waylin Maffeo",
		"name_company": "DabZ",
		"email": "wmaffeo1@gov.uk",
		"phone_number": "293-723-2626",
		"id_register_member_flow": "f4cf24d1-e756-4284-b657-bf72d8446e00",
		"name_grade": 2,
		"id_workflow_status": "Menunggu Pembayaran",
		"employee_starting_date": "11/11/2018",
		"approve_at": "1/18/2019"
	  }, {
		"id": 3,
		"name": "Antoinette Babington",
		"name_company": "Bluejam",
		"email": "ababington2@nyu.edu",
		"phone_number": "468-152-6281",
		"id_register_member_flow": "1c98c1fa-79f3-4f78-ae71-b9fded127fb1",
		"name_grade": 3,
		"id_workflow_status": "Menunggu Approval Keanggotaan",
		"employee_starting_date": "1/13/2019",
		"approve_at": "2/9/2019"
	  }, {
		"id": 4,
		"name": "Domenic Shama",
		"name_company": "Skaboo",
		"email": "dshama3@apple.com",
		"phone_number": "974-533-8635",
		"id_register_member_flow": "cd72c507-a42c-4fc7-9c50-b2ab55ad1251",
		"name_grade": 4,
		"id_workflow_status": "Menunggu Pembayaran",
		"employee_starting_date": "7/22/2018",
		"approve_at": "1/6/2019"
	  }, {
		"id": 5,
		"name": "Jonah Kits",
		"name_company": "Edgeclub",
		"email": "jkits4@unc.edu",
		"phone_number": "654-472-9335",
		"id_register_member_flow": "7d3f076f-f957-476d-8faf-41562d666648",
		"name_grade": 5,
		"id_workflow_status": "Menunggu Approval Keanggotaan",
		"employee_starting_date": "6/6/2018",
		"approve_at": "11/13/2018"
	  }, {
		"id": 6,
		"name": "Grove Instrell",
		"name_company": "Quatz",
		"email": "ginstrell5@yale.edu",
		"phone_number": "345-750-0028",
		"id_register_member_flow": "3b3d4445-2cc5-494c-9a7e-13217da17ae6",
		"name_grade": 1,
		"id_workflow_status": "Menunggu Approval Keanggotaan",
		"employee_starting_date": "10/2/2018",
		"approve_at": "6/9/2018"
	  }, {
		"id": 7,
		"name": "Morissa Marsie",
		"name_company": "Brightdog",
		"email": "mmarsie6@webnode.com",
		"phone_number": "792-199-3808",
		"id_register_member_flow": "d12a9fd8-6df5-445a-8ac6-fa1d0f0f0ce4",
		"name_grade": 2,
		"id_workflow_status": "Menunggu Approval Keanggotaan",
		"employee_starting_date": "12/19/2018",
		"approve_at": "5/18/2018"
	  }, {
		"id": 8,
		"name": "Haley Palliser",
		"name_company": "Jabberbean",
		"email": "hpalliser7@ucoz.com",
		"phone_number": "547-309-7089",
		"id_register_member_flow": "f72f3cff-93fb-4fbc-8c4a-38303dc30c09",
		"name_grade": 3,
		"id_workflow_status": "Menunggu Pembayaran",
		"employee_starting_date": "2/1/2019",
		"approve_at": "3/12/2018"
	  }, {
		"id": 9,
		"name": "Pernell Gilliat",
		"name_company": "Plajo",
		"email": "pgilliat8@ycombinator.com",
		"phone_number": "534-199-7481",
		"id_register_member_flow": "6fd81d4e-f97c-42b2-9d64-f40244fea0f3",
		"name_grade": 2,
		"id_workflow_status": "Menunggu Approval Keanggotaan",
		"employee_starting_date": "4/23/2018",
		"approve_at": "10/31/2018"
	  }, {
		"id": 10,
		"name": "Homere Renzo",
		"name_company": "Demimbu",
		"email": "hrenzo9@elegantthemes.com",
		"phone_number": "602-325-3470",
		"id_register_member_flow": "935fbee7-88f5-41d7-a9b9-0d8b6a0e7d3c",
		"name_grade": 2,
		"id_workflow_status": "Menunggu Approval Keanggotaan",
		"employee_starting_date": "8/19/2018",
		"approve_at": "5/16/2018"
	  }, {
		"id": 11,
		"name": "Hadley Halliday",
		"name_company": "Youfeed",
		"email": "hhallidaya@stumbleupon.com",
		"phone_number": "311-641-6125",
		"id_register_member_flow": "77ffce40-6a73-4e1b-9719-298d843bc689",
		"name_grade": 1,
		"id_workflow_status": "Menunggu Approval Keanggotaan",
		"employee_starting_date": "7/25/2018",
		"approve_at": "12/8/2018"
	  }, {
		"id": 12,
		"name": "Cristina Foot",
		"name_company": "Oyope",
		"email": "cfootb@businessweek.com",
		"phone_number": "480-765-2965",
		"id_register_member_flow": "60219201-4bea-4d95-9e69-5ec4c0a69cc3",
		"name_grade": 2,
		"id_workflow_status": "Menunggu Approval Keanggotaan",
		"employee_starting_date": "9/16/2018",
		"approve_at": "7/11/2018"
	  }, {
		"id": 13,
		"name": "Jill Kemmish",
		"name_company": "Wikizz",
		"email": "jkemmishc@unesco.org",
		"phone_number": "524-586-0387",
		"id_register_member_flow": "550bf703-8fad-4170-888a-ab91f94ce0eb",
		"name_grade": 3,
		"id_workflow_status": "Menunggu Approval Keanggotaan",
		"employee_starting_date": "4/1/2018",
		"approve_at": "6/29/2018"
	  }, {
		"id": 14,
		"name": "Jeth Surman-Wells",
		"name_company": "Photobug",
		"email": "jsurmanwellsd@creativecommons.org",
		"phone_number": "703-147-7343",
		"id_register_member_flow": "57c9d525-0ea3-498a-9e36-4558d612f3c7",
		"name_grade": 2,
		"id_workflow_status": "Menunggu Approval Keanggotaan",
		"employee_starting_date": "9/11/2018",
		"approve_at": "9/3/2018"
	  }, {
		"id": 15,
		"name": "Allyson Gadney",
		"name_company": "Buzzshare",
		"email": "agadneye@amazon.co.jp",
		"phone_number": "592-847-2374",
		"id_register_member_flow": "88a3a855-9769-49ec-bf08-a8fa82bb803b",
		"name_grade": 1,
		"id_workflow_status": "Menunggu Approval Keanggotaan",
		"employee_starting_date": "6/1/2018",
		"approve_at": "6/8/2018"
	  }, {
		"id": 16,
		"name": "Alexandra Jurges",
		"name_company": "Topdrive",
		"email": "ajurgesf@goo.gl",
		"phone_number": "321-661-2618",
		"id_register_member_flow": "20864bcd-64ae-47e0-9416-e546a1a026bd",
		"name_grade": 2,
		"id_workflow_status": "Menunggu Pembayaran",
		"employee_starting_date": "7/15/2018",
		"approve_at": "11/3/2018"
	  }, {
		"id": 17,
		"name": "Annaliese Ruzic",
		"name_company": "Bubblemix",
		"email": "aruzicg@prlog.org",
		"phone_number": "368-105-9565",
		"id_register_member_flow": "4d0148ef-773e-4ecd-8a54-ae094e349ad0",
		"name_grade": 2,
		"id_workflow_status": "Menunggu Approval Keanggotaan",
		"employee_starting_date": "1/7/2019",
		"approve_at": "3/3/2018"
	  }, {
		"id": 18,
		"name": "Dionis Bromwich",
		"name_company": "Realbuzz",
		"email": "dbromwichh@aboutads.info",
		"phone_number": "394-665-5928",
		"id_register_member_flow": "bdbab3fe-5796-4cf9-a327-e2dc53e3bedc",
		"name_grade": 1,
		"id_workflow_status": "Menunggu Approval Keanggotaan",
		"employee_starting_date": "1/13/2019",
		"approve_at": "2/2/2019"
	  }, {
		"id": 19,
		"name": "Jobie Fewkes",
		"name_company": "Twitterwire",
		"email": "jfewkesi@springer.com",
		"phone_number": "816-920-4240",
		"id_register_member_flow": "beffd9a1-aaaa-4085-b660-43d4182ce3ed",
		"name_grade": 2,
		"id_workflow_status": "Menunggu Approval Keanggotaan",
		"employee_starting_date": "10/11/2018",
		"approve_at": "1/25/2019"
	  }, {
		"id": 20,
		"name": "Leelah Kupker",
		"name_company": "Digitube",
		"email": "lkupkerj@hhs.gov",
		"phone_number": "403-827-3612",
		"id_register_member_flow": "9e4fdc9e-fae3-4af2-a761-efc5969081b0",
		"name_grade": 3,
		"id_workflow_status": "Menunggu Approval Keanggotaan",
		"employee_starting_date": "7/20/2018",
		"approve_at": "8/3/2018"
	}];
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
		this.fetchCompany();

		this.columns = [
			{field: 'id', header: 'No', show:true},
			{field: 'name', header: 'Nama Anggota', show:true},
			{field: 'name_company', header: 'Company', show:true},
			{field: 'id_register_member_flow', header: 'NRP Karyawan', show:true},
			{field: 'email', header: 'Email', show:false},
			{field: 'phone_number', header: 'No Telpon', show:false},
			{field: 'employee_starting_date', header: 'Tanggal Masuk', show:true},
			{field: 'name_grade', header: 'Golongan', show:false},
			{field: 'id_workflow_status', header: 'Status Request', show:true},
			{field: 'approve_at', header: 'Request Date', show:false},

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
			// this.data = res['data'].data;
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