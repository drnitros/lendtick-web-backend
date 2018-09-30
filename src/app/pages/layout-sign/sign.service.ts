import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { APIService } from '../../service/api.service';

@Injectable({
	providedIn: 'root'
})
export class SignService {
	private urlLogin: string = this.API.hostAuth + '/auth'

	constructor(
		private API: APIService,
		private http: HttpClient
	){}

	postLogin(obj){
		const options = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json'
			})
		};
		let body = JSON.stringify(obj);
		return this.http.post(this.urlLogin, body, options );
	}
}
