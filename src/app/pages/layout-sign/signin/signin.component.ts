import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SignService } from '../sign.service';
import { APIService } from '../../../service/api.service';
import { store } from '../../../service/store.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
	public email: string = null;
	public password: string = null;
	public isLoading: boolean = false;
	public errorUser: boolean = false;

	constructor(
		private APIService: APIService,
		private signService: SignService,
		private router: Router
	){ }

	ngOnInit() {
	}

	onSubmit(e){
		this.isLoading = true;
		this.errorUser = false;
		this.signService.postLogin(e).subscribe(res =>{
			if(res['status']){
				localStorage.setItem("token", res['data'].token);
				localStorage.setItem("id_role_master", res['data'].id_role_master);
				localStorage.setItem("is_new_user", res['data'].is_new_user);
			}
			this.isLoading = false;
			this.router.navigate(['/main/']);  
		}, err =>{
			this.errorUser = true;
			this.isLoading = false;
		})
	}
}	
