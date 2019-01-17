import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IconsModule } from '../../icons/icons.module';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { ProductService } from './product.service';

import { MainProductComponent } from './main-product/main-product.component';
import { SyncProductComponent } from './sync-product/sync-product.component';
import { SettingProductComponent } from './setting-product/setting-product.component';

@NgModule({
	imports: [
		RouterModule,
		FormsModule,
		CommonModule,
		BrowserAnimationsModule,
		HttpClientModule,

		IconsModule,
		DropdownModule,
		ProgressSpinnerModule
	],
	providers: [ProductService],
	declarations: [MainProductComponent, SyncProductComponent, SettingProductComponent]
})
export class ProductsModule { }
