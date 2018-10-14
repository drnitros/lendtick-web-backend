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
			  'accept':  'application/json',
			})
		};
		let body = JSON.stringify(obj);
		console.log(body);
		return this.http.post(this.urlPostUser, body, options);
	}
	getAprrovalUser(start){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : this.APIService['token']
			})
		};
		return this.http.get(this.urlGetApprovalUser + '?start=' + start +  '&length=10&sort=name,asc',options);
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
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : this.APIService['token']
			})
		};
		return this.http.get(this.urlGetCompany,options);
	}

	postCoba(){
		const options = {
			headers: new HttpHeaders({
				'accept':  'application/json',
				'Authorization' : this.APIService['token']
			})
		};
		let body = JSON.stringify({
			"desc": [
			  {
				"lang": "string",
				"val": "string"
			  }
			],
			"fname": "string",
			"lname": "string",
			"category": "string",
			"brand": {
			  "id": "string",
			  "img": {
				"src": "string"
			  },
			  "name": "string"
			},
			"assets": {
			  "imgs": [
				{
				  "img": {
					"height": "string",
					"src": "string",
					"width": "string"
				  }
				}
			  ]
			},
			"shipping": {
			  "dimensions": {
				"height": "string",
				"length": "string",
				"width": "string"
			  },
			  "weight": "string"
			},
			"specs": [
			  {
				"name": "string",
				"val": "string"
			  }
			],
			"attrs": [
			  {
				"name": "string",
				"value": "string"
			  }
			],
			"variants": {
			  "cnt": 0,
			  "attrs": [
				{
				  "dispType": "string",
				  "name": "string"
				}
			  ]
			},
			"lastupdated": 0
		});
		console.log(body);
		return this.http.post("https://lentick-api-product-dev.azurewebsites.net/master/party", body, options);
	}
	
}
