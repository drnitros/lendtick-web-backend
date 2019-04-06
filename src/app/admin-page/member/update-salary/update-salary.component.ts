import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-update-salary',
  templateUrl: './update-salary.component.html',
  styleUrls: ['./update-salary.component.scss']
})
export class UpdateSalaryComponent implements OnInit {
	public data:any = [];
	public columns:any = [];
	public selectedColumns: any[];
	public loading: boolean;
	public selectedItem = null;
	public date: Date = null;
	public displaynew: boolean = false;
	public amount = 1;
	public date1 = null;
	public date2 = null;
	public widthDialog: number = 0;
	public grades = [
		{label: "I", value: "G1"},
		{label: "II", value: "G2"},
		{label: "III", value: "G3"},
		{label: "IV", value: "G4"},
	];
	public companies = [
		{label: "AGIT", value: "COM001"},
		{label: "PT ASTRA INTERNATIONAL", value: "COM002"},
	];

	public display = false;

	constructor(){}


	ngOnInit() {
		this.fetchUser();

		this.columns = [
			{field: 'number', header: 'No', show:true},
			{field: 'name', header: 'Nama', show:false},
			{field: 'company_name', header: 'Perusahaan', show:true},
			{field: 'nik', header: 'NIK', show:true},
			{field: 'tgl_masuk', header: 'Tanggal Masuk', show:true},
			{field: 'tgl_pengajuan', header: 'Tanggal Pengajuan', show:true},
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
			this.data = [{
				number: 1,
				name: "Adam Jordan",
				company_name: "AGIT",
				company: "COM002",
				nik: "23423423",
				tgl_masuk: "21 March 2019",
				tgl_pengajuan: "25 Juni 2019",
				status: true,
			},{
				number: 2,
				name: "Asep Sumarna",
				company_name: "PT ASTRA INTERNATIONAL",
				company: "COM002",
				nik: "23423423",
				tgl_masuk: "21 March 2019",
				tgl_pengajuan: "25 Juni 2019",
				status: true,
			},{
				number: 3,
				name: "Gagan Gunawan",
				company_name: "AGIT",
				company: "COM001",
				nik: "23423423",
				tgl_masuk: "21 March 2019",
				tgl_pengajuan: "25 Juni 2019",
				status: true,
			}];
		}, 3000);
	}

	// Select Item / User
	// ======================== //
	selectItem(e){
		this.display = true;
		this.selectedItem = e;
		this.widthDialog = $(window).width() - 60;
		setTimeout(() => { 
			window.dispatchEvent(new Event('resize')); 
		}, 500);
	}
}
