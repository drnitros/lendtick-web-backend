import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';

import * as _ from 'lodash';
import * as screenfull from 'screenfull';
import { APIService } from "../../service/api.service";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	public displaySidebar: boolean = false;
	public name: string;
	public photo: string;
	public loading: boolean;
	public checked: boolean = false;
	public checked2: boolean = false;
	public checked3: boolean = true;
	public checked4: boolean = false;
	public checked5: boolean = true;
	public checked6: boolean = false;
	public checked7: boolean = false;
	public checked8: boolean = true;

	constructor(
		private router: Router,
		private headerService: HeaderService,
		private apiService: APIService
	) { }

	ngOnInit() {
		this.fetchUserProfile();
	}
	
	onFullscreen(){
		screenfull.toggle();
	}

	fetchUserProfile(){
		this.loading = true;
		this.headerService.getProfilelUser().subscribe(res =>{
			this.name = _.truncate(res['data'].name, {
				'length': 10,
				'separator': '...'
			});
			this.photo = res['data'].personal_photo;
			this.loading = false;
			this.fetchCheckUser();
		}, err =>{
			this.loading = false;
			if(err.status == 401) this.headerService.updateToken(err.error.data.token, this.fetchUserProfile());
		});
	}

	fetchCheckUser(){
		this.headerService.getCheckUser().subscribe(res =>{
			localStorage.setItem("id_role_master", res['data'].id_role_master);
			localStorage.setItem("id_user", res['data'].id_user);
		});
	}

	// Search
	// ========================== //
	public inputSearch = null;
	public countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas"
	,"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands"
	,"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica"
	,"Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea"
	,"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana"
	,"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India"
	,"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia"
	,"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania"
	,"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia"
	,"New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"
	,"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles"
	,"Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","St. Lucia","Sudan"
	,"Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia"
	,"Turkey","Turkmenistan","Turks & Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay"
	,"Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
	public results = [];
	search(e){
		this.results =  _.filter(this.countries, function(item) {
			return item.toLowerCase().indexOf(e.query.toLowerCase()) >= 0;
		});
	}

	logout(){
		localStorage.removeItem("token");
		location.reload();
	}
}
