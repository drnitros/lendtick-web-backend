import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MemberService } from '../../member/member.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss']
})
export class UserSettingComponent implements OnInit {
	private objFilter = {};
	public data:any = [{
		number: 1,
		name: "Adam Jordan",
		email: "adamjordan@gmail.com",
		name_company: "Toyota",
		role: "Admin Kop",
		status: true,
		last_login: "29/01/2018 01:01:11",
	},{
		number: 2,
		name: "Asep Wiguna",
		email: "asep212@gmail.com",
		name_company: "Agit",
		role: "HRD",
		status: true,
		last_login: "29/01/2018 01:01:11",
	},{
		number: 3,
		name: "Jajang Komarudin",
		email: "jajangkomarudin@gmail.com",
		name_company: "Agit",
		role: "Admin Kop",
		status: false,
		last_login: "29/01/2018 01:01:11",
	}];
	public columns:any = [];
	public selectedColumns: any[];
	public loading: boolean;
	public selectedItem = null;
	public companies = [];
	public display = false;

	constructor(
		private memberService: MemberService,
		private router: Router
	) { }


	ngOnInit() {
		this.fetchUser();
		this.fetchCompany();

		this.columns = [
			{field: 'number', header: 'No', show:true},
			{field: 'name', header: 'Nama', show:true},
			{field: 'email', header: 'Email', show:true},
			{field: 'name_company', header: 'Nama Perusahaan', show:true},
			{field: 'role', header: 'Role', show:true},
			{field: 'last_login', header: 'Terakhir Login', show:true},
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
