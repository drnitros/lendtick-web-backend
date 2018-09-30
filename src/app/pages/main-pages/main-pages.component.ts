import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
	selector: 'app-main-pages',
	template: '<router-outlet></router-outlet>',
})
export class MainPagesComponent implements OnInit {

	constructor() { }

	ngOnInit() {
		$('.core-content').removeClass('core-sidebar');
	}

}
