import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-counter1',
  templateUrl: './counter1.component.html',
  styleUrls: ['./counter1.component.scss']
})
export class Counter1Component implements OnInit {
	// Input
	// ============================ //
	@Input() title = "Revenue";
	@Input() counter = "$62,00";
	@Input() percentage = 25;
	@Input() styleClass = null;
	@Input() iconName = "calendar";
	@Input() icon = "fab fa-creative-commons-sampling";

	constructor() { }

	ngOnInit() {
	}

}
