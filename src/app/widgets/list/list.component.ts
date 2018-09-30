import { Component,OnInit,Input } from '@angular/core';
import { WidgetService } from '../widget.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	// Properties
	// ============================ //
	public selectedList: null;

	// Input
	// ============================ //
	@Input() data :any = [];
	@Input() columns:any = [
		{field: 'avatar', header: ''},
		{field: 'fullname', header: 'Fullname'},
		{field: 'payment', header: 'Paid'},
	];
	@Input() paginator:boolean = true;
	@Input() rows:number = 4;

	constructor(private widgetService: WidgetService) { }

	ngOnInit() {
		this.fetchUser();
	}

	fetchUser(){
		this.widgetService.getUser().subscribe(res =>{
			this.data = res;
		});
	}

}
