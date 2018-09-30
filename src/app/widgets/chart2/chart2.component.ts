import { Component,OnInit,Input,Output,EventEmitter,ViewChild } from '@angular/core';
import { UIChart } from "primeng/components/chart/chart";

@Component({
	selector: 'app-chart2',
	templateUrl: './chart2.component.html',
	styleUrls: ['./chart2.component.scss']
})
export class Chart2Component implements OnInit {
	// Properties
	// ============================ //
	public options: any;

	@ViewChild('chart') chart: UIChart; 

	// Input
	// ============================ //
	@Input() height = 170;
	@Input() yAxes = false;
	@Input() styleClass = null;
	@Input() time = "July, 2018 Tuesday";
	@Input() listItem = [
		{label: "POINT", value: "77,54",icon: "<i class='fab fa-creative-commons-sampling icon-content'></i>"},
		{label: "PROJECT", value: "12,5", icon: "<i class='fas fa-code-branch icon-content'></i>"},
	];
	@Input() data: any = {
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
					stacked: true,
					display: true,
					ticks: {
						display: this.yAxes,
						maxTicksLimit: 10
					},
					gridLines: {
						zeroLineColor: 'rgba(0,0,0,0.1)'
					}
				}],
				xAxes:[{
					stacked: true,
					display: false,
					barPercentage: 0.8
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
