import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-page500',
  templateUrl: './page500.component.html',
  styleUrls: ['./page500.component.scss']
})
export class Page500Component implements OnInit {

	constructor() { }

	ngOnInit() {
		$('.core-content').removeClass('core-sidebar');
	}

}