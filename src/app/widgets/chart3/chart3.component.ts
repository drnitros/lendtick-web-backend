import { Component,OnInit,Input,Output,EventEmitter,ViewChild } from '@angular/core';
import { UIChart } from "primeng/components/chart/chart";

@Component({
  selector: 'app-chart3',
  templateUrl: './chart3.component.html',
  styleUrls: ['./chart3.component.scss']
})
export class Chart3Component implements OnInit {
	// Properties
	// ============================ //
	public options: any;

	@ViewChild('chart') chart: UIChart; 

	// Input
	// ============================ //
	@Input() height = 150;
	@Input() styleClass = null;
	@Input() time = "July, 2018 Tuesday";
	@Input() listItem = [
		{label: "PHOTOS",percentage:25},
		{label: "TALK EMPTY",percentage: 73},
		{label: "FILM",percentage: 45},
	];
	@Input() data: any = {
		labels: ['a','b','c','d','e','f','g','h','i','j','k','l'],
		datasets: [{
			label: 'Series A',
			backgroundColor: 'rgba(155, 89, 182, .7)',
			borderColor: 'rgba(255, 255, 255, .5)',
			borderWidth: 2,
			pointBackgroundColor: '#34495e',
			data: [12,24,45,25,23,48,37,38,45,30,56,45],
			lineTension: 0
		}], 
	};

	// Output
	// ============================ //
	@Output() onRefresh = new EventEmitter();

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
					radius:3
				}
			},
			scales: {
				yAxes:[{
					display: true,
					ticks: {
						display: false
					}
				}],
				xAxes:[{
					display: false,
				}]
			}
		};
	}

	refresh(){
		this.onRefresh.emit();
		this.data = this.data;
		this.chart.reinit();
	}
}
