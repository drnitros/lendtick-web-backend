import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
declare var $: any;

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss']
})
export class EcommerceComponent implements OnInit {
	// Properties
	// ==================== //
	public values = [37,42,40,31,35,45,48,40,45,42];
	public dataCounter1;
	public dataCounter2;
	public dataCounter3;
	public dataCounter4;
	public datachart1;
	public listItem1;
	public dataChart2;
	public markers = [];
	public columns = [];

	constructor(){}

	ngOnInit() {
		this.dataCounter1 = {
			labels: ['a','b','c','d','e','f','g','h','i','j'],
			datasets: [{
				backgroundColor: 'transparent',
				borderColor: 'rgba(46,204,113, 0.7)',
				borderWidth: 3,
				data: _.shuffle(this.values),
				lineTension: 0
			}], 
		};
		this.dataCounter2 = {
			labels: ['a','b','c','d','e','f','g','h','i','j'],
			datasets: [{
				backgroundColor: 'transparent',
				borderColor: '#f39c12',
				borderWidth: 3,
				data: _.shuffle(this.values),
				lineTension: 0
			}], 
		};
		this.dataCounter3 = {
			labels: ['a','b','c','d','e','f','g','h','i','j'],
			datasets: [{
				backgroundColor: 'transparent',
				borderColor: '#e74c3c',
				borderWidth: 3,
				data: _.shuffle(this.values),
				lineTension: 0
			}], 
		};
		this.dataCounter4 = {
			labels: ['a','b','c','d','e','f','g','h','i','j'],
			datasets: [{
				backgroundColor: 'transparent',
				borderColor: '#1abc9c',
				borderWidth: 3,
				data: _.shuffle(this.values),
				lineTension: 0
			}], 
		};
		// "rgba(46,204,113,0.8)","rgba(52,152,219,0.8)","rgba(155, 89, 182, 0.7)"
		this.datachart1 = {
			labels: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17'],
			datasets: [{
				label: 'Series A',
				backgroundColor: '#3dbea3',
				borderColor: '#3dbea3',
				borderWidth: 0,
				pointBackgroundColor: '#3dbea3',
				data: [12,24,45,25,23,48,37,38,45,30,56,45,25,24,45,25,23],
			},{
				label: 'Series B',
				backgroundColor: '#f3f3fb',
				borderColor: '#f3f3fb',
				borderWidth: 0,
				pointBackgroundColor: '#f3f3fb',
				data: [11,25,31,26,25,46,35,37,43,32,54,43,26,20,43,23,21],
			}], 
		};
		this.listItem1 = [
			{label: "ORDER", value: "77,54",icon: "<i class='fas fa-cart-plus icon-content'></i>"},
			{label: "STOCK", value: "12,5", icon: "<i class='fas fa-briefcase icon-content'></i>"},
			{label: "VISITOR", value: "17,504",icon: "<i class='fas fa-users icon-content'></i>"},
			{label: "DEPOSIT", value: "1,502", icon: "<i class='far fa-credit-card icon-content'></i>"},
		];

		this.dataChart2 = {
			labels: ['A','B','C'],
			datasets: [
				{
					data: [35, 35, 30],
					backgroundColor: ["#20c5da","#596ac0","#fdb738"],
					hoverBackgroundColor: ["#20c5da","#596ac0","#fdb738"],
					borderColor: ["#20c5da","#596ac0","#fdb738"],
					borderWidth: 1,
				}
			] 
		}

		this.markers = [{
			latLng: [35.21, 101.97],
			name: 'Pamanukan (+25.17)'
		}, {
			latLng: [37.09, -95.71],
			name: 'Cijambe (-28.12)'
		}, {
			latLng: [36.20, -99.25],
			name: 'Ciganea (+18.84%)'
		}, {
			latLng: [41.02, -94.01],
			name: 'Santoaan (+3.34%)'
		}, {
			latLng: [40.02, -104.01],
			name: 'Pagaden (+16.68%)'
		}, {
			latLng: [36.20, -87.23],
			name: 'Kamarung (+20.13%)'
		}];

		this.setColumns();
		$(window).on('resize', ()=>{
			this.setColumns();
		});
	}

	setColumns(){
		var width = $(window).width();
		if(width > 1200){
			this.columns = [
				{field: 'avatar', header: ''},
				{field: 'fullname', header: 'Fullname'},
				{field: 'country', header: 'Country'},
				{field: 'payment', header: 'Paid'},
				{field: 'website', header: 'Website'},
			];
		}else if(width < 1200 && width > 767){
			this.columns = [
				{field: 'avatar', header: ''},
				{field: 'fullname', header: 'Fullname'},
				{field: 'payment', header: 'Paid'},
			];
		}else if(width < 767){
			this.columns = [
				{field: 'avatar', header: ''},
				{field: 'fullname', header: 'Fullname'},
				{field: 'country', header: 'Country'},
				{field: 'payment', header: 'Paid'},
				{field: 'website', header: 'Website'},
			];
		}
	}

}
