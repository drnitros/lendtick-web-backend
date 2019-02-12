import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IconsModule } from '../../icons/icons.module';

import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { CustomFormsModule } from 'ng2-validation';

import { JangkaPanjangComponent } from './jangka-panjang/jangka-panjang.component';
import { MainLoanComponent } from './main-loan/main-loan.component';
import { MicroloanComponent } from './microloan/microloan.component';
import { DetailLoanComponent } from './detail-loan/detail-loan.component';

@NgModule({
	imports: [
		RouterModule,
		FormsModule,
		CommonModule,
		BrowserAnimationsModule,
		IconsModule,
		HttpClientModule,
		CustomFormsModule,

		TableModule,
		ToastModule,
		SidebarModule,
		ProgressSpinnerModule,
		MultiSelectModule,
		DropdownModule,
		CalendarModule,
		DialogModule,
		FileUploadModule
	],
	declarations: [
		JangkaPanjangComponent, 
		MainLoanComponent, 
		MicroloanComponent, DetailLoanComponent
	]
})
export class LoanModule { }
