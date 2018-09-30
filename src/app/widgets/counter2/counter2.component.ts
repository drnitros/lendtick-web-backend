import { Component,OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-counter2',
  templateUrl: './counter2.component.html',
  styleUrls: ['./counter2.component.scss']
})
export class Counter2Component implements OnInit {
	// Propertoes
	// ============================ //
	public options: any;


	// Input
	// ============================ //
	@Input() height = 50;
	@Input() title = "Revenue";
	@Input() counter = "$125,000";
	@Input() styleClass = null;
	@Input() percentage = 75;
	@Input() data: any = {
		labels: ['A','B','C'],
		datasets: [
			{
				data: [35, 15, 50],
				backgroundColor: ["rgba(46,204,113,0.8)","rgba(52,152,219,0.8)","rgba(155, 89, 182, 0.7)"],
				hoverBackgroundColor: ["rgba(46,204,113,1)","rgba(52,152,219,1)","rgba(155, 89, 182, 1)"],
				borderColor: ["rgba(46,204,113,0.8)","rgba(52,152,219,0.8)","rgba(155, 89, 182, 0.7)"],
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
