import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
	// Input Dropdown
	// ====================== //
    public cities = [];
	public selectedCity = null;
	
	constructor() { }

	ngOnInit() {
		// Input Dropdown
	    // ====================== //
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Subang', code: 'SBG'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'},
        ];
	}

}
