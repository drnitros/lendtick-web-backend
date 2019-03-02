import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})
export class MainComponent implements OnInit {

	constructor(
		private router: Router
	) { }

	ngOnInit() {
		let token = localStorage.getItem("token");
		if(!token){
			this.router.navigate(['/sign/']);  
		}
	}

}
