import { Component,OnInit,Input } from '@angular/core';

@Component({
	selector: 'app-chart5',
	templateUrl: './chart5.component.html',
	styleUrls: ['./chart5.component.scss']
})
export class Chart5Component implements OnInit {
	// Properties
	// ====================== //
	public options: any;

	// Input
	// ====================== //
	@Input() size: number = 120;
	@Input() listColour: any = ["#9b59b6","#1abc9c","#fdb738"];
	@Input() listItem: any = [
		{label:"Woman",color:"#9b59b6"},
		{label:"Man",color:"#1abc9c"},
		{label:"Accesories",color:"#fdb738"},
	];
	@Input() data: any = {
		labels: ['A','B','C'],
		datasets: [
			{
				data: [35, 35, 30],
				backgroundColor: this.listColour,
				hoverBackgroundColor: this.listColour,
				borderColor: this.listColour,
				borderWidth: 1,
			}
		]   
	};

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
					borderWidth: 1
				},
				point:{
					radius:.5
				}
			},
			scales: {
				yAxes:[{
					display: false
				}],
				xAxes:[{
					display: false
				}]
			}
		};
	}

}
