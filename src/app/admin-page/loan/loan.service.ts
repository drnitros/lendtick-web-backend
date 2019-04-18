import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { APIService } from "../../service/api.service";

@Injectable({
	providedIn: 'root'
})
export class LoanService {
	private urlGetLoan = this.APIService['hostLoan'] + '/loan/backend/index';
	private urlGetLoanDetail = this.APIService['hostLoan'] + '/loan/backend/detail';
	private urlGetLoanDocument = this.APIService['hostLoan'] + '/loan/document';
	private urlGetGrade = this.APIService['hostAuth'] + '/mst/grade';
	private urlGetCompany = this.APIService['hostAuth'] + '/company/auth/get';
	private urlGetCompany2 = this.APIService['hostAuth'] + '/company/get';
	private urlGetNoncooperative = this.APIService['hostLoan'] + '/master/loan/noncooperative/type';
	private urlPostLoanNoncooperative = this.APIService['hostLoan'] + '/noncoorperative/loan';
	private urlPutApprove = this.APIService['hostLoan'] + '/loan/backend/aprrove';
	private urlPutReject = this.APIService['hostLoan'] + '/loan/backend/reject';
	private urlPostSalary = this.APIService['hostAuth'] + '/salary/req';
	
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

	// Post Sallary
	// ====================== //
	postSalary(obj){
		const options = {
			headers: new HttpHeaders({
				'accept':  'application/json',
				'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.post(this.urlPostSalary, obj, options);
	}

	// U[date] Approve Loan
	// ====================== //
	putRejectLoan(obj){
		const options = {
			headers: new HttpHeaders({
				'accept':  'application/json',
				'Authorization' : localStorage.getItem('token')
			})
		};
		let body = obj;
		return this.http.put(this.urlPutReject, body, options);
	}

	// Update Approve Loan
	// ====================== //
	putApproveLoan(obj){
		const options = {
			headers: new HttpHeaders({
				'accept':  'application/json',
				'Authorization' : localStorage.getItem('token')
			})
		};
		let body = obj;
		return this.http.put(this.urlPutApprove, body, options);
	}

	// Post Loan Non Cooperative
	// ====================== //
	postPostLoanNoncooperative(obj){
		const options = {
			headers: new HttpHeaders({
				'accept':  'application/json',
				'Authorization' : localStorage.getItem('token')
			})
		};
		let body = obj;
		return this.http.post(this.urlPostLoanNoncooperative, body, options);
	}

	// Get Loan
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
	getNoncoperateLoan(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetNoncooperative,options);
	}
	getLoadDocument(id_user,loan_type){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetLoanDocument + '?id_user='+ id_user +'&loanType=' + loan_type,options);
	}
	getLoadDetail(id_user,id_loan){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetLoanDetail + '?id_user='+ id_user +'&id_loan=' + id_loan,options);
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
