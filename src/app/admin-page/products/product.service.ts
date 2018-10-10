import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";

import { APIService } from "../../service/api.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
	private urlGetProduct = this.APIService['hostProduct'] + '/master/product/all';

  	constructor(
		private APIService: APIService,
		private http: HttpClient
	){}
		
	getProductAll(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : this.APIService['token']
			})
		};
		return this.http.get('https://lentick-api-product-dev.azurewebsites.net/master/product/all',options);
	}
}
