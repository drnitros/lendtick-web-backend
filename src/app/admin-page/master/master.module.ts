import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MasterService } from './master.service';
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
import { SpinnerModule } from 'primeng/spinner';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CustomFormsModule } from 'ng2-validation';

import { MainMasterComponent } from './main-master/main-master.component';
import { LoanTypeComponent } from './loan-type/loan-type.component';
import { UserSettingComponent } from './user-setting/user-setting.component';

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
		SpinnerModule,
		FileUploadModule,
		InputSwitchModule
	],
	declarations: [LoanTypeComponent, UserSettingComponent, MainMasterComponent],
	providers: [MasterService]
})
export class MasterModule { }
