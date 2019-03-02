import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";

import { APIService } from "../../service/api.service";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
	private urlGetRefresh = this.APIService['hostAuth'] + '/auth/refresh';
	private urlGetApprovalUser = this.APIService['hostAuth'] + '/profile/get';
	private urlGetCheckUser = this.APIService['hostAuth'] + '/auth/check';

	constructor(
		private APIService: APIService,
		private http: HttpClient
	) { }

	refreshToken(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetRefresh,options);
	}
	updateToken(run){
		this.refreshToken().subscribe(res =>{
			localStorage.setItem("token", res['data'].token);
			return run;
		});
	}
	
	getProfilelUser(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetApprovalUser,options);
	}

	getCheckUser(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetCheckUser,options);
	}
}
