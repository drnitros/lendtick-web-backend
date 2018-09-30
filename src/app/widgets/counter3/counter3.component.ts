import { Component,OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-counter3',
  templateUrl: './counter3.component.html',
  styleUrls: ['./counter3.component.scss']
})
export class Counter3Component implements OnInit {
	// Properties
	// ============================ //
	public options: any;

	// Input
	// ============================ //
	@Input() title = "Balance";
	@Input() counter = "$123,00";
	@Input() styleClass = null;
	@Input() data: any = {
		labels: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p'],
		datasets: [{
			label: 'Series A',
			backgroundColor: 'rgba(46,204,113, 1)',
			borderColor: 'rgba(46,204,113, 1)',
			borderWidth: 2,
			data: [14,18,22,25,20,20,23,28,31,37,25,28,35,37,42,53],
		}], 
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
					radius:.0
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

}
