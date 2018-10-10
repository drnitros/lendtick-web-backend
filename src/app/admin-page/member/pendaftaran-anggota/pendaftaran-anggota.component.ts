import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-pendaftaran-anggota',
  templateUrl: './pendaftaran-anggota.component.html',
  styleUrls: ['./pendaftaran-anggota.component.scss']
})
export class PendaftaranAnggotaComponent implements OnInit {
	public data:any = [];
	public columns:any = [];
	public display: boolean = false;
	public selectedColumns: any[];
	public loading: boolean;

	constructor(
		private memberService: MemberService
	) { }


	ngOnInit() {
		this.fetchUser();

		this.columns = [
			{field: 'approve_at', header: 'Approve At', show:true},
			{field: 'approve_by', header: 'Approve By', show:true},
			{field: 'authorization_company', header: 'Authorization Company', show:true},
			{field: 'id_master_register_member_flow', header: 'ID Master Register Member Flow', show:false},
			{field: 'id_register_member_flow', header: 'ID Register Member Flow', show:true},
			{field: 'id_role_master', header: 'ID Role Master', show:true},
			{field: 'id_user', header: 'ID User', show:true},
			{field: 'level', header: 'Level', show:false},
			{field: 'send_email_to_member', header: 'Send Email to Member', show:false},
			{field: 'send_email_to_role', header: 'Send Email to Role', show:false},
			{field: 'set_workflow_status_code', header: 'Set Workflow Status Code', show:false}
		]
		this.selectedColumns = _.filter(this.columns,{show:true});
	}

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

	fetchUser(){
		this.loading = true;
		this.memberService.getAprrovalUser(1).subscribe(res =>{
			this.data = res['data'].data;
			this.loading = false;
		}, err=>{
			// this.fetchUser();
			console.log(err);
			console.log(err.status);
			this.loading = false;
		});
	}
}
