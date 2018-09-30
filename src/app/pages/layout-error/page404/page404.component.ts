import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component implements OnInit {

	constructor() { }

	ngOnInit() {
		$('.core-content').removeClass('core-sidebar');
	}

}
