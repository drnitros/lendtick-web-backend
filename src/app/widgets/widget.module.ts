import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IconsModule } from '../icons/icons.module';
import { ChartModule } from 'primeng/chart';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';

import { WidgetService } from './widget.service';

import { Chart1Component } from './chart1/chart1.component';
import { Chart2Component } from './chart2/chart2.component';
import { Chart3Component } from './chart3/chart3.component';
import { Counter1Component } from './counter1/counter1.component';
import { Counter2Component } from './counter2/counter2.component';
import { Counter3Component } from './counter3/counter3.component';
import { Counter4Component } from './counter4/counter4.component';
import { Chart4Component } from './chart4/chart4.component';
import { TodoComponent } from './todo/todo.component';
import { WeatherComponent } from './weather/weather.component';
import { ListComponent } from './list/list.component';
import { Chart5Component } from './chart5/chart5.component';
import { MapVectorComponent } from './map-vector/map-vector.component';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule,
		FormsModule,
		BrowserAnimationsModule,
		IconsModule,
		ChartModule,
		TooltipModule,
		InputSwitchModule,
		CheckboxModule,
		ScrollPanelModule,
		TableModule
	],
	providers: [WidgetService],
	exports: [MapVectorComponent,Chart5Component,Chart1Component, Chart2Component, Chart3Component, Counter1Component, Counter2Component,Counter3Component, Counter4Component, Chart4Component, TodoComponent, WeatherComponent, ListComponent],
	declarations: [Chart1Component, Chart2Component, Chart3Component, Counter1Component, Counter2Component, Counter3Component, Counter4Component, Chart4Component, TodoComponent, WeatherComponent, ListComponent, Chart5Component, MapVectorComponent]
})
export class WidgetModule { }
