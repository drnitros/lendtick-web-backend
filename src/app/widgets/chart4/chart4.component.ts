import { Component, OnInit,Input } from '@angular/core';

@Component({
	selector: 'app-chart4',
	templateUrl: './chart4.component.html',
	styleUrls: ['./chart4.component.scss']
})
export class Chart4Component implements OnInit {
	// Properties
	// ============================ //
	public options: any;

	// Input
	// ============================ //
	@Input() height = 270;
	@Input() yAxes = false;
	@Input() checked: boolean = false;
	@Input() data: any = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				label: 'Series A',
				backgroundColor: '#9562f4',
				borderColor: '#9562f4',
				pointBackgroundColor: '#9562f4',
				borderWidth: 2,
				data: [35, 65, 32, 31, 23, 30, 21]
			},
			{
				label: 'Series B',
				backgroundColor: '#fd778a',
				borderColor: '#fd778a',
				pointBackgroundColor: '#fd778a',
				borderWidth: 2,
				data: [35, 45, 55, 35, 25, 31, 20],
			},{
				label: 'Series C',
				backgroundColor: '#62b6f9',
				borderColor: '#62b6f9',
				pointBackgroundColor: '#62b6f9',
				borderWidth: 2,
				data: [36, 40, 45, 50, 30, 32, 18],
			}
		]
	};
	@Input() listItem = [
		{title: "Total sales", value: "$10,332", subValue: "+15%", textSubValueClass: "text-success"},
		{title: "Total Budget", value: "$10,534", subValue: "+13%", textSubValueClass: "text-success"},
		{title: "Income amount", value: "$1,534", subValue: "-15%", textSubValueClass: "text-danger"},
		{title: "Page views", value: "23,934", subValue: "-16%", textSubValueClass: "text-danger"},
		{title: "Talk Empty", value: "12,900", subValue: "+15%", textSubValueClass: "text-success"},
	];

	constructor() { }

	ngOnInit() {
		this.options = {
			responsive: false,
			legend:{
				display: false
			},
			elements:{
				line:{
					borderColor: '#000000',
					borderWidth: 4
				},
				point:{
					radius:1
				}
			},
			scales: {
				yAxes:[{
					display: true,
					ticks: {
						display: true,
						maxTicksLimit: 5
					},
					gridLines: {
						zeroLineColor: 'rgba(0,0,0,0.1)'
					}
				}],
				xAxes:[{
					display: true,
					barPercentage: 0.8,
				}]
			}
		};
	}

}
