import { Injectable } from '@angular/core';
import { store } from './store.service';
import { Router } from '@angular/router';

import * as _ from 'lodash';
import { utils, write, WorkBook } from 'xlsx';
import { saveAs } from 'file-saver';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Injectable({
	providedIn: 'root'
})
export class APIService {
	// Rest API 
	public hostAuth: string = "https://lentick-api-user-management-dev.azurewebsites.net";
	// public hostAuth: string = "http://192.168.43.49";
	
	// Token
	// =================== //
	public token = null;
	updateToken(token){
		this.token = '';
	}
	
	// Store
	// =================== //
	public store;
	
	constructor(
		private router: Router
	) {
		this.token = localStorage.getItem("token");
		console.log(localStorage.getItem("token"));
		store.subscribe(() => {
			this.store = store.getState();
			localStorage.setItem("token", this.store.auth.token);
			this.token = localStorage.getItem("token");
		});
	}
	
	// Export Data
	// =========================== //
	exportDataCsv(data,title){
        var options = { 
            headers: Object.keys(data[0]),
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: true, 
            showTitle: true,
            useBom: true
        };
        new Angular2Csv(data, title, options);
    }
    exportDataXls(data,title){
        const ws_name = title;
		const wb: WorkBook = { SheetNames: [], Sheets: {} };
        const ws: any = utils.json_to_sheet(data);
		wb.SheetNames.push(ws_name);
        wb.Sheets[ws_name] = ws;
		const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary'});
	
		function s2ab(s) {
			const buf = new ArrayBuffer(s.length);
			const view = new Uint8Array(buf);
			_.map(s, (x,i)=>{
				view[i] = s.charCodeAt(i) & 0xFF;
			});
			return buf;
		}
	
		saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), title + '.xlsx');
    }
}
