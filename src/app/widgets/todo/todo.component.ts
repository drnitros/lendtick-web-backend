import { Component,OnInit,Input } from '@angular/core';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
	// Properties
	// ============================ //
	public listItem = [
		{label: 'Lorem ipsum dolor sit amet', done: false},
		{label: 'Te usu enim ornatus praesent', done: false},
		{label: 'Vis ut altera temporibus', done: true},
		{label: 'Ad brute dicat ubique pri', done: false},
		{label: 'Ne eos audire albucius"', done: false},
	];
	public textTodo = "";

	// Input
	// ============================ //
	@Input() style = {width: '100%', height: '224px'};

	constructor() { }

	ngOnInit() {
	}

	addTodo(){
		if(this.textTodo != ""){
			this.listItem.push({label:this.textTodo,done:false});
			this.textTodo = "";
		}
	}

}
