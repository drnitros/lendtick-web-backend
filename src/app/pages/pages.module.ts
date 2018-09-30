import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { IconsModule } from '../icons/icons.module';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';

import { MainPagesComponent } from './main-pages/main-pages.component';
import { SigninComponent } from './layout-sign/signin/signin.component';
import { SignupComponent } from './layout-sign/signup/signup.component';
import { Page404Component } from './layout-error/page404/page404.component';
import { Page500Component } from './layout-error/page500/page500.component';
import { LayoutSignComponent } from './layout-sign/layout-sign.component';
import { LayoutErrorComponent } from './layout-error/layout-error.component';

import { SignService } from './layout-sign/sign.service';

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule,
		FormsModule,
		CommonModule,
    BrowserAnimationsModule,
    IconsModule,
    DropdownModule,
    AccordionModule
  ],
  declarations: [SigninComponent, SignupComponent, Page404Component, Page500Component, LayoutSignComponent, LayoutErrorComponent, MainPagesComponent],
  providers: [SignService]
})
export class PagesModule { }
