import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";

import { APIService } from "../../service/api.service";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
	private urlGetApprovalUser = this.APIService['hostAuth'] + '/profile/get';

	constructor(
		private APIService: APIService,
		private http: HttpClient
	) { }

	getProfilelUser(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : this.APIService['token']
			})
		};
		return this.http.get(this.urlGetApprovalUser,options);
	}
}
