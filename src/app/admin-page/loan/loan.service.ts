import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { APIService } from "../../service/api.service";

@Injectable({
	providedIn: 'root'
})
export class LoanService {
	private urlGetLoan = this.APIService['hostLoan'] + '/loan/backend/index';
	private urlGetGrade = this.APIService['hostAuth'] + '/mst/grade';
	private urlGetCompany = this.APIService['hostAuth'] + '/company/auth/get';
	private urlGetCompany2 = this.APIService['hostAuth'] + '/company/get';

	constructor(
		private APIService: APIService,
		private http: HttpClient
	){}

	// Update Token
	// ======================== //
	updateToken(token){
		localStorage.setItem("token", token);
		location.reload();
	}

	// Ge Loan
	// ====================== //
	getLoan(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetLoan,options);
	}

	// Get Master
	// ====================== //
	getGrade(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetGrade,options);
	}
	getCompany(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetCompany,options);
	}
	getCompany2(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetCompany2,options);
	}
}
