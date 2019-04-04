import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {Router} from "@angular/router";

@Component({
  selector: 'app-non-koperasi',
  templateUrl: './non-koperasi.component.html',
  styleUrls: ['./non-koperasi.component.scss']
})
export class NonKoperasiComponent implements OnInit {

  public data:any = [
    {"id":1,"no":1,"nama":"John Doe","perusahaan":"PT Mencari Cinta Sejati co, ltd.", "nik":"765764576", "tgl_masuk":"20 Februari 2019", "tgl_pengajuan":"15 Februari 2019", "status":"Waiting for approval"},
    {"id":2,"no":2,"nama":"Jane Doo","perusahaan":"PT Mendapat Cinta Sejati co, ltd.", "nik":"765764576", "tgl_masuk":"20 Februari 2019", "tgl_pengajuan":"15 Februari 2019", "status":"Waiting for approval"},
    {"id":3,"no":3,"nama":"Jinn Daa","perusahaan":"PT Membuang Cinta Sejati co, ltd.", "nik":"765764576", "tgl_masuk":"20 Februari 2019", "tgl_pengajuan":"15 Februari 2019", "status":"Waiting for approval"}
  ];
	public columns:any = [];
	public selectedColumns: any[];
  public loading: boolean;
  public selectedItem = null;
  constructor(
		private router: Router
  ) { }

  ngOnInit() {
    
		this.columns = [
			{field: 'no', header: 'No', show:true},
			{field: 'nama', header: 'ID', show:true},
			{field: 'perusahaan', header: 'Perusahaan', show:true},
			{field: 'nik', header: 'NIK', show:true},
			{field: 'tgl_masuk', header: 'Tanggal masuk', show:true},
			{field: 'tgl_pengajuan', header: 'Tanggal pengajuan', show:true},
			{field: 'status', header: 'Status', show:true},
		]
    this.selectedColumns = _.filter(this.columns,{show:true});
  }

  selectItem(data){
		this.router.navigate(['/main/loan/non-koperasi/' + data.id]);
    console.log(data);
  }
}
