import { Component,OnInit,Input,Output,EventEmitter,ViewChild } from '@angular/core';
import { UIChart } from "primeng/components/chart/chart";

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss']
})
export class Chart1Component implements OnInit {
	// Properties
	// ============================ //
	public options: any;

	@ViewChild('chart') chart: UIChart; 

	// Input
	// ============================ //
	@Input() height = 180;
	@Input() styleClass = null;
	@Input() time = "July, 2018 Tuesday";
	@Input() listItem = [
		{label: "Price", value: "$560,01"},
		{label: "Sales", value: "213"},
		{label: "Change", value: "80,5%"},
	];
	@Input() data: any = {
		labels: ['a','b','c','d','e','f','g','h','i','j','k','l'],
		datasets: [{
			label: 'Series A',
			backgroundColor: 'rgba(255,255,255, 0.1)',
			borderColor: 'rgba(255,255,255, 0.5)',
			borderWidth: 2,
			pointBackgroundColor: '#8e44ad',
			data: [12,24,45,25,23,48,37,38,45,50,56,45],
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
					radius:5
				}
			},
			scales: {
				yAxes:[{
					display: false
				}],
				xAxes:[{
					display: true,
					ticks: {
						display: false
					},
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
