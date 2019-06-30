import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { APIService } from "../../service/api.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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

	// User Sallary
	// ====================== //
	getHistoryOrder(){
		console.log("asadasd");
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.APIService.hostLoan + '/order/history',options);
	}
}
