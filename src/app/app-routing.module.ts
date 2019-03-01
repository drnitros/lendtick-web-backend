import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './admin-page/layout/main-component.component';

// Dashboard 
// ========================== //
import { MainDashboardComponent } from './admin-page/dashboard/main-dashboard/main-dashboard.component';
import { EcommerceComponent } from './admin-page/dashboard/ecommerce/ecommerce.component';

// Member
// ========================== //
import { ApprovalMemberComponent } from './admin-page/member/approval-member/approval-member.component';
import { MainMemberComponent } from './admin-page/member/main-member/main-member.component';
import { ListMemberComponent } from './admin-page/member/list-member/list-member.component';

// Loan
// ========================== //
import { MicroloanComponent } from './admin-page/loan/microloan/microloan.component';
import { JangkaPanjangComponent } from './admin-page/loan/jangka-panjang/jangka-panjang.component';
import { MainLoanComponent } from './admin-page/loan/main-loan/main-loan.component';
import { DetailLoanComponent } from './admin-page/loan/detail-loan/detail-loan.component';

// Products
// ========================== //
import { MainProductComponent } from './admin-page/products/main-product/main-product.component';
import { SyncProductComponent } from './admin-page/products/sync-product/sync-product.component';
import { SettingProductComponent } from './admin-page/products/setting-product/setting-product.component';

// Pages
// ========================== //
import { SigninComponent } from './pages/layout-sign/signin/signin.component';
import { SignupComponent } from './pages/layout-sign/signup/signup.component';
import { Page404Component } from './pages/layout-error/page404/page404.component';
import { Page500Component } from './pages/layout-error/page500/page500.component';

// Layout Sign
// ========================== //
import { LayoutSignComponent } from './pages/layout-sign/layout-sign.component';
import { LayoutErrorComponent } from './pages/layout-error/layout-error.component';

const routes: Routes = [
	{ path: '', redirectTo: 'main', pathMatch: 'full' },
	{ path: 'main', component: MainComponent, 
		children:[
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{ path: 'dashboard', component: MainDashboardComponent },
			{ path: 'ecommerce-dahsboard', component: EcommerceComponent },
			{ path: 'member', component: MainMemberComponent,
				children: [
					{ path: '', redirectTo: 'anggota', pathMatch: 'full' },
					{ path: 'calon-anggota', component: ApprovalMemberComponent },
					{ path: 'anggota', component: ListMemberComponent },
				]
			},
			{ path: 'product', component: MainProductComponent,
				children: [
					{ path: '', redirectTo: 'sync', pathMatch: 'full' },
					{ path: 'sync', component: SyncProductComponent },
					{ path: 'setting', component: SettingProductComponent },
				]
            },
            { path: 'loan', component: MainLoanComponent,
				children: [
					{ path: '', redirectTo: 'microloan', pathMatch: 'full' },
					{ path: 'microloan', component: MicroloanComponent },
					{ path: 'jangka-panjang', component: JangkaPanjangComponent },
					{ path: 'detail', component: DetailLoanComponent },
				]
			}
		]
	},
	{ path: 'error', component: LayoutErrorComponent, 
		children: [
			{ path: '', redirectTo: '404', pathMatch: 'full' },
			{ path: '404', component: Page404Component },
			{ path: '500', component: Page500Component },
		]
	},
	{ path: 'sign', component: LayoutSignComponent, 
		children: [
			{ path: '', redirectTo: 'signin', pathMatch: 'full' },
			{ path: 'signin', component: SigninComponent },
			{ path: 'signup', component: SignupComponent },
		]
	},
	{ path: '**', redirectTo: '/error/404', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
