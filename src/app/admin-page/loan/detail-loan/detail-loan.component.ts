import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-detail-loan',
	templateUrl: './detail-loan.component.html',
	styleUrls: ['./detail-loan.component.scss']
})
export class DetailLoanComponent implements OnInit {
	public type;
	public date: Date = null;
	public bunga: number = 1;
	public isPopupVisible: boolean;
	public formAddLoan:FormGroup;
	public tipePinjaman = [
		{id:'multi_guna',title:'Multi Guna'},
		{id:'pendidikan',title:'Pendidikan'},
		{id:'cicilan_hrd',title:'Cicilan HRD-1'}
	];
	constructor(private route: ActivatedRoute) { 
		this.formAddLoan = new FormGroup({
			nama: new FormControl({value:"bambang", disabled:true}, Validators.required),
			perusahaan: new FormControl({value:"Pt Mencari Cinta Sejati", disabled:true}, Validators.required),
			nik: new FormControl({value:"35454532", disabled:true}, Validators.required),
			tgl_mulai: new FormControl("", Validators.required),
			tgl_selesai: new FormControl("", Validators.required),
			tipe: new FormControl("", Validators.required),
			total_pinjaman: new FormControl("", Validators.required),
			jumlah_perbulan: new FormControl("", Validators.required),
		 });
	}

	ngOnInit() {
		this.route.queryParamMap.subscribe(queryParams => {
			this.type = queryParams.get("type");
		})
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

}
