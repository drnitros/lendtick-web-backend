import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";

import { APIService } from "../../service/api.service";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
	private urlGetApprovalUser = this.APIService['hostAuth'] + '/user/approve/list';
	private urlGetGrade = this.APIService['hostAuth'] + '/mst/grade';
	private urlGetStatus = this.APIService['hostAuth'] + '/mst/user/status';
	private urlGetCompany = this.APIService['hostAuth'] + '/company/get';
	private urlApproveUser = this.APIService['hostAuth'] + '/user/approve';
	private urlRejectUser = this.APIService['hostAuth'] + '/user/reject';
	private urlPostUser = this.APIService['hostAuth'] + '/reg';
	private urlGetUserList = this.APIService['hostAuth'] + '/user/list';

	constructor(
		private APIService: APIService,
		private http: HttpClient
	){}
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
			  'Authorization' : this.APIService['token']
			})
		};
		let filter = escape(JSON.stringify(objFilter));
		return this.http.get(this.urlGetApprovalUser + '?start=' + start +  '&length='+ length +'&sort=name,asc&manual_filter=' + filter,options);
	}
	getListUser(start,objFilter){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : this.APIService['token']
			})
		};
		let filter = escape(JSON.stringify(objFilter));
		return this.http.get(this.urlGetUserList + '?start=' + start +  '&length=1000&sort=name,asc&manual_filter=' + filter,options);
	}
	putApproveUser(obj){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : this.APIService['token']
			})
		};
		let body = obj;
		return this.http.put(this.urlApproveUser, body, options);
	}
	putRejectUser(obj){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : this.APIService['token']
			})
		};
		let body = obj;
		return this.http.put(this.urlRejectUser, body, options);
	}
	getGrade(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : this.APIService['token']
			})
		};
		return this.http.get(this.urlGetGrade,options);
	}
	getStatus(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : this.APIService['token']
			})
		};
		return this.http.get(this.urlGetStatus,options);
	}
	getCompany(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : this.APIService['token']
			})
		};
		return this.http.get(this.urlGetCompany,options);
	}
	
}
