import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-non-koperasi-detail',
  templateUrl: './non-koperasi-detail.component.html',
  styleUrls: ['./non-koperasi-detail.component.scss']
})
export class NonKoperasiDetailComponent implements OnInit {

  public data:any = [
    {"no":1,"nama":"John Doe","perusahaan":"PT Mencari Cinta Sejati co, ltd.", "nik":"765764576", "tgl_mulai":"20 Februari 2019", "tgl_selesai":"20 Maret 2019", "tipe":"Non koperasi", "jumlah_perbulan":"Rp 100,000", "total_pinjaman":"Rp 500,000"},
    {"no":2,"nama":"John Doe","perusahaan":"PT Mencari Cinta Sejati co, ltd.", "nik":"765764576", "tgl_mulai":"22 Maret 2019", "tgl_selesai":"15 April 2019", "tipe":"Non koperasi", "jumlah_perbulan":"Rp 200,000", "total_pinjaman":"Rp 600,000"},
  ];
	public columns:any = [];
	public selectedColumns: any[];
  public loading: boolean;
  public isPopupVisible:boolean;
  public isProcessing: boolean;
  public selectedItem = null;
	public formAddLoan:FormGroup;
	public tipePinjaman = [
		{id:'multi_guna',title:'Non koperasi'}
  ];
  
  constructor() { 
    this.formAddLoan = new FormGroup({
			nama: new FormControl({value:"John doe", disabled:true}, Validators.required),
			perusahaan: new FormControl({value:"Pt Mencari Cinta Sejati", disabled:true}, Validators.required),
			nik: new FormControl({value:"765764576", disabled:true}, Validators.required),
			tgl_mulai: new FormControl("", Validators.required),
			tgl_selesai: new FormControl("", Validators.required),
			tipe: new FormControl("", Validators.required),
			total_pinjaman: new FormControl("", Validators.required),
			jumlah_perbulan: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
		this.columns = [
			{field: 'no', header: 'No', show:true},
			{field: 'nama', header: 'Nama', show:true},
			{field: 'perusahaan', header: 'Perusahaan', show:true},
			{field: 'nik', header: 'NIK', show:true},
			{field: 'tipe', header: 'Tipe pinjaman', show:true},
			{field: 'tgl_mulai', header: 'Tanggal mulai', show:true},
			{field: 'tgl_selesai', header: 'Tanggal selesai', show:true},
			{field: 'jumlah_perbulan', header: 'Jumlah per bulan', show:true},
			{field: 'total_pinjaman', header: 'Jumlah total pinjaman', show:true},
		]
    this.selectedColumns = _.filter(this.columns,{show:true});
  }
  
	back(){
		this.isPopupVisible = false;
		this.formAddLoan.reset();
	}
	save(){
		this.isPopupVisible = false;
		console.log(this.formAddLoan.value);
		this.formAddLoan.reset();
  }
  
  openDialogForm(){
    this.isPopupVisible = true;
  }


}
