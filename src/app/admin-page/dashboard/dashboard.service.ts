import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { APIService } from "../../service/api.service";


@Injectable({
    providedIn: 'root'
  })

export class DashboardService {
    private urlGetTotalOrder = this.APIService['hostLoan'] + '/order/total';
    private urlGetTotalUser = this.APIService['hostAuth'] + '/v2/user/total-member-register';

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
    
    // Get Total Order
	// ====================== //
	getTotalOrder(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetTotalOrder,options);
    }
    
    // Get Total User
	// ====================== //
	getTotalUser(){
		const options = {
			headers: new HttpHeaders({
			  'accept':  'application/json',
			  'Authorization' : localStorage.getItem('token')
			})
		};
		return this.http.get(this.urlGetTotalUser,options);
	}
}