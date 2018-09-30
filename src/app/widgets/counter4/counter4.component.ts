import { Component,OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-counter4',
  templateUrl: './counter4.component.html',
  styleUrls: ['./counter4.component.scss']
})
export class Counter4Component implements OnInit {
	// Properties
	// ============================ //
	public options: any;

	// Input
	// ============================ //
	@Input() title = "Bounce rate";
	@Input() percentage = 45;
	@Input() styleClass = null;
	@Input() data: any = {
		labels: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p'],
		datasets: [{
			label: 'Series A',
			backgroundColor: 'rgba(46,204,113, 0.1)',
			borderColor: 'rgba(46,204,113, 0.7)',
			borderWidth: 1,
			data: [37,25,34,25,38,36,24,35,24,37,38,23,29,31,21,28],
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
