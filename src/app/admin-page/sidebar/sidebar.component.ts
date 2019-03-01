import { Component, OnInit } from '@angular/core';
import { store } from '../../service/store.service';
import { MemberService } from '../member/member.service';
declare var $: any;

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
	public roleId;
	public counter: Number;
	constructor(
		private memberService: MemberService
	) { 
		store.subscribe(() => {
			this.counter = store.getState().member.jmlCalongAnggota;
		});
	}

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

		this.memberService.getAprrovalUser(0, 1000, null).subscribe(res =>{
			this.counter = res['data'].count_filter;
		});
	}
	  
	ngAfterViewInit(){
		this.roleId = localStorage.getItem('id_role_master');
	}

}
