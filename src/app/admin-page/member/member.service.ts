import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { APIService } from "../../service/api.service";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
	private urlGetRefresh = this.APIService['hostAuth'] + '/auth/refresh';
	private urlGetApprovalUser = this.APIService['hostAuth'] + '/user/approve/list';
	private urlGetGrade = this.APIService['hostAuth'] + '/mst/grade';
	private urlGetStatus = this.APIService['hostAuth'] + '/mst/user/status';
	private urlGetCompany = this.APIService['hostAuth'] + '/company/auth/get';
	private urlApproveUser = this.APIService['hostAuth'] + '/user/approve';
	private urlRejectUser = this.APIService['hostAuth'] + '/user/reject';
	private urlPostUser = this.APIService['hostAuth'] + '/reg';
	private urlGetUserList = this.APIService['hostAuth'] + '/user/list';
	private urlGetUserDetail = this.APIService['hostAuth'] + '/user/detail';

	constructor(
		private APIService: APIService,
		private http: HttpClient
	){}

	refreshToken(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetRefresh,options);
	}
	getUserDetail(id){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetUserDetail + '?id=' + id,options);
	}
	updateToken(run){
		this.refreshToken().subscribe(res =>{
			localStorage.setItem("token", res['data'].token);
			return run;
		});
	}
	postUser(obj){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			})
		};
		let body = obj;
		return this.http.post(this.urlPostUser, body, options);
	}
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
	
}
