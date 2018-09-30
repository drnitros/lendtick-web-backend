import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";

import { APIService } from "../../service/api.service";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
	private urlGetApprovalUser = this.APIService['hostAuth'] + '/user/approve/list';
	private urlGetGrade = this.APIService['hostAuth'] + '/mst/grade';
	private urlGetCompany = this.APIService['hostAuth'] + '/company/get';
	private urlApproveUser = this.APIService['hostAuth'] + '/user/approve';
	private urlPostUser = this.APIService['hostAuth'] + '/reg';

	constructor(
		private APIService: APIService,
		private http: HttpClient
	){}
	
	postUser(obj){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json'
			})
		};
		let body = JSON.stringify(obj);
		return this.http.post(this.urlPostUser, body, options);
	}
	getAprrovalUser(start){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : this.APIService['token']
			})
		};
		return this.http.get(this.urlGetApprovalUser + '?start=' + start +  '&length=10&sort=asc',options);
	}
	putApproveUser(obj){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : this.APIService['token']
			})
		};
		let body = JSON.stringify(obj);
		return this.http.put(this.urlApproveUser, body, options);
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
	getCompany(){
		console.log(this.APIService['token']);
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : this.APIService['token']
			})
		};
		return this.http.get(this.urlGetCompany,options);
	}
	
}
