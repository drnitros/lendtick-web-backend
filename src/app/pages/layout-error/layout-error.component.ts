import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-layout-error',
  templateUrl: './layout-error.component.html',
  styleUrls: ['./layout-error.component.scss']
})
export class LayoutErrorComponent implements OnInit {

	constructor() { }

	ngOnInit() {
		$('.core-content').removeClass('core-sidebar');
	}

}
