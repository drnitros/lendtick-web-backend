import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
	private hostProduct = './assets/json/PRODUCT.json';
	private host = './assets/json/MOCK_DATA.json';
	
	constructor(private http: HttpClient){}

	getProduct(){
		return this.http.get(this.hostProduct);
	}

	getUser(){
		return this.http.get(this.host);
	}
}
