import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";

import { APIService } from "../../service/api.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
	private urlGetMasterProduct = this.APIService['hostProduct'] + '/master/product/all';
	private urlGetChanel = "https:/commerce-kai-channel.azurewebsites.net/data-sync";

  	constructor(
		private APIService: APIService,
		private http: HttpClient
	){}
	getMasterAll(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetMasterProduct,options);
	}

	getChanelProduct(limit,offset){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetChanel + '?limit=' + limit + '&offset=' + offset,options);
	}
}
