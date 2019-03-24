import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { APIService } from "../../service/api.service";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
	private urlGetApprovalUser = this.APIService['hostAuth'] + '/user/approve/list';

	private urlGetGrade = this.APIService['hostAuth'] + '/mst/grade';
	private urlGetReligion = this.APIService['hostAuth'] + '/mst/religion';
	private urlGetStatus = this.APIService['hostAuth'] + '/mst/user/status';
	private urlGetMarriage = this.APIService['hostAuth'] + '/mst/marriage';
	private urlGetDomicile = this.APIService['hostAuth'] + '/mst/domicile';
	private urlGetRole = this.APIService['hostAuth'] + '/mst/role';

	private urlGetCompany = this.APIService['hostAuth'] + '/company/auth/get';
	private urlApproveUser = this.APIService['hostAuth'] + '/user/approve';
	private urlRejectUser = this.APIService['hostAuth'] + '/user/reject';
	private urlPostUser = this.APIService['hostAuth'] + '/reg';
	private urlGetUserList = this.APIService['hostAuth'] + '/user/list';
	private urlGetUserDetail = this.APIService['hostAuth'] + '/user/detail';
	private urlGetSalary = this.APIService['hostAuth'] + '/profile/salary';
	private urlGetBank = this.APIService['hostAuth'] + '/profile/bank';

	private urlGetDocument = this.APIService['hostAuth'] + '/profile/document';
	private urlPostDocument = this.APIService['hostAuth'] + '/profile/document/add';
	private urlDeleteDocument = this.APIService['hostAuth'] + '/profile/document/delete';

	private urlPutMutation = this.APIService['hostAuth'] + '/user/mutation';

	constructor(
		private APIService: APIService,
		private http: HttpClient
	){}

	// Update Token
	// ======================== //
	updateToken(token,run){
		localStorage.setItem("token", token);
		return run;
	}

	// Convert Image to base64
	// ====================== //
	toDataUrl(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			var reader = new FileReader();
			reader.onloadend = function() {
				callback(reader.result);
			}
			reader.readAsDataURL(xhr.response);
		};
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
	}	

	// Update Mutation
	updateMutation(body){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.put(this.urlPutMutation,body,options);
	}

	// User Sallary
	// ====================== //
	getSallary(id){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetSalary + '?id=' + id,options);
	}

	// User Bank
	// ====================== //
	getBank(id){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetBank + '?id=' + id,options);
	}

	// User Document
	// ====================== //
	getDocument(id){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetDocument + '?id=' + id,options);
	}
	postDocument(obj){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			})
		};
		let body = obj;
		return this.http.post(this.urlPostDocument, body, options);
	}

	deleteDocument(id_user,id_user_doc){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		let body = JSON.stringify({
			id: id_user,
			id_user_document: id_user_doc
		});
		return this.http.put(this.urlDeleteDocument,body,options);
	}

	// Get User Detail
	// ====================== //
	getUserDetail(id){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetUserDetail + '?id=' + id,options);
	}

	// Register
	// ====================== //
	postUser(obj){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			})
		};
		let body = obj;
		return this.http.post(this.urlPostUser, body, options);
	}

	// Get Approval User
	// ====================== //
	getAprrovalUser(start,length,objFilter){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		let filter = escape(JSON.stringify(objFilter));
		return this.http.get(this.urlGetApprovalUser + '?start=' + start +  '&length='+ length +'&sort=name,asc&manual_filter=' + filter,options);
	}

	// Get List User
	// ====================== //
	getListUser(start,length,objFilter){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		let filter = escape(JSON.stringify(objFilter));
		return this.http.get(this.urlGetUserList + '?start=' + start +  '&length='+ length +'&sort=name,asc&manual_filter=' + filter,options);
	}

	// Approve User
	// ====================== //
	putApproveUser(obj){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		let body = obj;
		return this.http.put(this.urlApproveUser, body, options);
	}

	// Reject User
	// ====================== //
	putRejectUser(obj){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		let body = obj;
		return this.http.put(this.urlRejectUser, body, options);
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
	getStatus(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetStatus,options);
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
	getReligion(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetReligion,options);
	}
	getDomicile(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetDomicile,options);
	}
	getMarriage(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetMarriage,options);
	}
	getRole(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetRole,options);
	}
}
