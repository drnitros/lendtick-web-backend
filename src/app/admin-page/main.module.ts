import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Modules
import { DashboardModule } from './dashboard/dashboard.module';
import { MemberModule } from './member/member.module';
import { ProductsModule } from './products/products.module';
import { LoanModule } from './loan/loan.module';
import { IconsModule } from '../icons/icons.module';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './layout/main-component.component';

// PrimeNG
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
	imports: [
		RouterModule,
		DashboardModule,
		IconsModule,
		MemberModule,
		ProductsModule,
		LoanModule,

		FormsModule,
		CommonModule,
		HttpClientModule,

		SidebarModule,
		OverlayPanelModule,
		TabViewModule,
		InputSwitchModule,
		AutoCompleteModule
	],
	declarations: [MainComponent, HeaderComponent, SidebarComponent],
	exports: [MainComponent]
})
export class MainModule { }
