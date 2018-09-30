import { Component,OnInit,Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-map-vector',
  templateUrl: './map-vector.component.html',
  styleUrls: ['./map-vector.component.scss']
})
export class MapVectorComponent implements OnInit {
	// Properties 
	// ===================== //
	@Input() title = "jVector Map";
	@Input() styleClass = null;
	@Input() bgPath = "#e1eaed";
	@Input() markPoint = "#9b59b6";
	@Input() mapName = "world_mill_en"; // us_aea_en or world_mill_en
	@Input() markers = [{
		latLng: [4.21, 101.97],
		name: 'Malaysia (+25.17)'
	}, {
		latLng: [37.09, 95.71],
		name: 'China (-28.12)'
	}, {
		latLng: [36.20, 138.25],
		name: 'Japan (+18.84%)'
	}, {
		latLng: [-7.15, -53.67],
		name: 'Brazil (+3.34%)'
	}, {
		latLng: [40.02, -104.01],
		name: 'United State (+16.68%)'
	}, {
		latLng: [76.20, -42.23],
		name: 'Greenland (+20.13%)'
	}];

	constructor() { }

	ngOnInit() {
		setTimeout(()=>{
			this.initMapVector();
		},500);
	}

	initMapVector(){

		$('#vector-map').vectorMap({
			map: this.mapName,
			backgroundColor: 'transparent',
			strokeWidth: 1,
			regionStyle: {
				initial: {
					fill: this.bgPath,
					'fill-opacity': 1,
					'cursor': 'pointer'
				},
				hover: {
					'fill-opacity': 1
				}
			},
			markerStyle: {
				initial: {
					fill: this.markPoint,
					stroke: this.markPoint,
					'fill-opacity': 1,
					'stroke-width': 8,
					'stroke-opacity': 0.3,
					'cursor': 'pointer',
					r: 5
				},
				hover: {
					r: 8,
					stroke: this.markPoint,
					'stroke-width': 10
				}
			},
			markers: this.markers
		});
	}
}
