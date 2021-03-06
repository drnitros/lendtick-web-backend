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
import { UpdateSalaryComponent } from './admin-page/member/update-salary/update-salary.component';

// Loan
// ========================== //
import { MicroloanComponent } from './admin-page/loan/microloan/microloan.component';
import { JangkaPanjangComponent } from './admin-page/loan/jangka-panjang/jangka-panjang.component';
import { MainLoanComponent } from './admin-page/loan/main-loan/main-loan.component';
import { DetailLoanComponent } from './admin-page/loan/detail-loan/detail-loan.component';
import { NonKoperasiComponent } from './admin-page/loan/non-koperasi/non-koperasi.component';
import { NonKoperasiDetailComponent } from './admin-page/loan/non-koperasi-detail/non-koperasi-detail.component';

// Products
// ========================== //
import { MainProductComponent } from './admin-page/products/main-product/main-product.component';
import { SyncProductComponent } from './admin-page/products/sync-product/sync-product.component';
import { SettingProductComponent } from './admin-page/products/setting-product/setting-product.component';

// Master
// ========================== //
import { MainMasterComponent } from './admin-page/master//main-master/main-master.component';
import { LoanTypeComponent } from './admin-page/master/loan-type/loan-type.component';
import { UserSettingComponent } from './admin-page/master/user-setting/user-setting.component';
import { VoucherComponent } from './admin-page/master/voucher/voucher.component';
import { CompanyComponent } from './admin-page/master/company/company.component';

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
					{ path: 'update-salary', component: UpdateSalaryComponent },
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
					{ path: 'detail/:id', component: DetailLoanComponent },
					{ path: 'non-koperasi', component: NonKoperasiComponent },
					{ path: 'non-koperasi/:id', component: NonKoperasiDetailComponent },
				]
			},
			{ path: 'master', component: MainMasterComponent,
				children: [
					{ path: '', redirectTo: 'loan-type', pathMatch: 'full' },
					{ path: 'loan-type', component: LoanTypeComponent },
					{ path: 'user-setting', component: UserSettingComponent },
					{ path: 'voucher', component: VoucherComponent },
					{ path: 'company', component: CompanyComponent }
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
