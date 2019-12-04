import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {
  
  public totalOrder = 0;
  public totalUser = 0;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.fetchTotalOrder();
    this.fetchTotalUser();
  }


  // Fetch Total Order
	// ========================= //
	fetchTotalOrder(){
		this.dashboardService.getTotalOrder().subscribe(res =>{
      this.totalOrder = res['data'].total_order;
      console.log(this.totalOrder);
		}, err =>{
			console.log(err);
		});
  }
  
  // Fetch Total User
	// ========================= //
	fetchTotalUser(){
		this.dashboardService.getTotalUser().subscribe(res =>{
      this.totalUser = res['data'].total_member_register;
      console.log(this.totalUser);
		}, err =>{
			console.log(err);
		});
	}
}
