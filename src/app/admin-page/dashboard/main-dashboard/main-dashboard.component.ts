import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {
  
  public totalOrder = 0;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.fetchTotalOrder()
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
}
