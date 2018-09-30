import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconsModule } from '../../icons/icons.module';
import { WidgetModule } from '../../widgets/widget.module';

import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';

@NgModule({
	imports: [
		IconsModule,
		CommonModule,
		WidgetModule
	],
	declarations: [MainDashboardComponent, EcommerceComponent]
})
export class DashboardModule { }
