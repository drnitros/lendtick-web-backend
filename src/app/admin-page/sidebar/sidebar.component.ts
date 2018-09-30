import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	constructor() { }

	ngOnInit() {
		$('nav').coreNavigation({
			layout: "sidebar",
			responsideSlide: true, // true or false
			dropdownEvent: "accordion",
			mode: 'fixed'
		});
		$('.dropdown-overlay').hide();
		$('.core-nav-list li.dropdown').each(function(){
			setTimeout(()=>{
				$('a.active', this).closest('li.dropdown').addClass('open');
			},500);
		});
  	}

}
