import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: 'app-detail-loan',
	templateUrl: './detail-loan.component.html',
	styleUrls: ['./detail-loan.component.scss']
})
export class DetailLoanComponent implements OnInit {
	public type;
	public date: Date = null;
	public bunga: number = 1;
	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.queryParamMap.subscribe(queryParams => {
			this.type = queryParams.get("type");
		})
	}

}
