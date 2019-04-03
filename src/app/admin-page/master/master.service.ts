import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { APIService } from "../../service/api.service";

@Injectable({
  providedIn: 'root'
})
export class MasterService {
	private urlGetLoanType = this.APIService['hostLoan'] + '/master/loan/type';
	private urlGetCompany = this.APIService['hostLoan'] + '/master/loan/type';

	constructor(
		private APIService: APIService,
		private http: HttpClient
	) { }

	getLoanType(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetLoanType,options);
	}
	getListCompany(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetLoanType,options);
	}
}
