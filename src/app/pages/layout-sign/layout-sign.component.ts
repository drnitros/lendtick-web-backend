import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-layout-sign',
  templateUrl: './layout-sign.component.html',
  styleUrls: ['./layout-sign.component.scss']
})
export class LayoutSignComponent implements OnInit {

	constructor(
		private router: Router
	) { }

	ngOnInit() {
		$('.core-content').removeClass('core-sidebar');
		let token = localStorage.getItem("token");
		if(token != ''){
			this.router.navigate(['/main/']);  
		}
	}

}
