import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { APIService } from "../../service/api.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
	private urlGetCompany = this.APIService['hostAuth'] + '/company/auth/get';
	private urlGetOrderDetail = this.APIService['hostLoan'] + '/order/dashboard/detail';

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

	// History Order
	// ====================== //
	getHistoryOrder(start,length,status,bill_start, bill_end){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		// let filter = escape(JSON.stringify(objFilter));
		return this.http.get(this.APIService.hostLoan + '/order/history'  + '?start=' + start +  '&length='+ length + '&id_workflow_status=' + status + '&billing_date_start=' + bill_start + '&billing_date_end=' + bill_end,options);
	}

	// History Order Detail
	// ====================== //
	getOrderDetail(idOrder){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		// let filter = escape(JSON.stringify(objFilter));
		return this.http.get(this.urlGetOrderDetail  + '?id_order=' + idOrder ,options);
	}

	// Get Master
	// ====================== //
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
