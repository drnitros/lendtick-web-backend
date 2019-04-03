import { Component, OnInit } from '@angular/core';
import { MasterService } from '../master.service';
import { MemberService } from '../../member/member.service';
import * as _ from 'lodash';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  public data:any = [];
	public columns:any = [];
	public selectedColumns: any[];
  public loading: boolean;
  public isPopupVisible:boolean;
  public isProcessing: boolean;
	public selectedItem = null;
  public companies = [];
  public bankOptions = [{id:'bca', name:'BCA'}, {id:'mandiri', name:'Mandiri'}];
	public formCompany:FormGroup;
  constructor(private memberService: MemberService, private masterService: MasterService) { 
    this.formCompany = new FormGroup({
			name_company: new FormControl("", Validators.required),
			id_holding: new FormControl("", Validators.required),
			phone_number: new FormControl("", Validators.required),
			address: new FormControl("", Validators.required),
			is_kopnit: new FormControl("", Validators.required),
			loan_power: new FormControl("", Validators.required),
			id_bank_main: new FormControl("", Validators.required),
      account_number_bank_main: new FormControl("", Validators.required),
      account_name_bank_main: new FormControl("", Validators.required),      
		 });
  }

  ngOnInit() {
    
		this.fetchListCompany();

		this.columns = [
			{field: 'id_company', header: 'ID', show:true},
			{field: 'name_company', header: 'Nama perusahaan', show:true},
			{field: 'phone_number', header: 'Telepon', show:true},
			{field: 'loan_power', header: 'Kekuatan pinjam', show:true},
			{field: 'address', header: 'Alamat', show:true},
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
  

	// Select Item / Company
	// ======================== //
	selectItem(e){
    this.selectedItem = e;
    this.openDialogForm('edit');

		setTimeout(() => { 
			window.dispatchEvent(new Event('resize')); 
		}, 500);
  }
  
  
	// Fetching All list of company
	// ========================= //
	fetchListCompany(){

    // Static data company
    this.data = [{"id_company":"COMP001","name_company":"Astra International", "phone_number":"021882682", "loan_power":"Rp 200,000,000", "address":"DKI Jakarta"},{"id_company":"COMP002","name_company":"AGIT", "phone_number":"021882222", "loan_power":"Rp 100,000,000", "address":"Bandung"}];

		// this.loading = true;
		// this.memberService.getCompany2().subscribe(res =>{
		// 	_.map(res['data'], (x,i)=>{
		// 		x['number'] = i + 1;
		// 	});
		// 	this.data = res['data'];
		// 	this.loading = false;
		// }, err=>{
		// 	this.loading = false;
    // });
  }

  openDialogForm(action = 'add'){
    if(action === 'edit'){
      this.formCompany.patchValue({
        name_company: '1',
        id_holding: '2',
        phone_number: '3',
        address: '4',
        is_kopnit: true,
        loan_power: '6',
        id_bank_main: {id:'mandiri', name:'Mandiri'},
        account_number_bank_main: '8',
        account_name_bank_main: '9'     
      });
    }
		this.isPopupVisible = true;
    return;
  }
	back(){
		this.isPopupVisible = false;
		this.formCompany.reset();
	}
	save(){
		this.isPopupVisible = false;
		console.log(this.formCompany.value);
		this.formCompany.reset();
	}
  
}
