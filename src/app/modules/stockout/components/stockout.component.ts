import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';

import { Enumerable } from 'linq-es2015';
import { Path, Group, Text } from '@progress/kendo-drawing';
import { tileLayer, latLng, marker, icon, point, Map } from 'leaflet';
import { DataRoute } from 'src/app/modules/core/utils/DataRoute';
import { HeaderServices } from 'src/app/modules/core/services/header-service/header.services';
import { filterRoutesWithPrefix } from 'src/app/modules/core/shared';
import * as dataMock from '../fake-data/fake-data';
import { Observable } from 'rxjs';
import { FilterSelection } from '../../shared/components/bar-filters/state';

@Component({
  selector: 'cvn-stockout',
  templateUrl: './stockout.component.html',
  styleUrls: ['./stockout.component.scss']
})
export class StockoutComponent implements OnInit {
  routes: Enumerable<DataRoute<Data>>;
  data = dataMock;
  public filters$: Observable<FilterSelection>;


  public range = { start: null, end: null };
  public visible = true;
  public categoriesStockoutTreeColorCadena = '#FFC300';
  public categoriesStockoutTreeColorProducto = '#E74C3C';
  public plotValue = 2;
  public goalPerformanceValue = 2;

  public rango = {
    start: new Date(2018, 12, 1),
    end: new Date(2018, 12, 28)
  };

  public infoStandard = 'Agotado total';

  public pieData: any = [
    { category: 'Eaten', value: 0.42 },
    { category: 'Not eaten', value: 0.58 }
  ];


  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  pvChapinero = marker([4.6398113, -74.0683747], {
    icon: icon({
      iconSize: [30, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/images/marker-pv.png',
      shadowUrl: 'assets/images/marker-shadow-pv.png'
    })
  });

  pvKennedy = marker([4.6240473, -74.1556207], {
    icon: icon({
      iconSize: [30, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/images/marker-pv.png',
      shadowUrl: 'assets/images/marker-shadow-pv.png'
    })
  });

  pvJazmin = marker([4.6081553, -74.1205927], {
    icon: icon({
      iconSize: [30, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/images/marker-pv.png',
      shadowUrl: 'assets/images/marker-shadow-pv.png'
    })
  });

  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps
    },
    overlays: {
      'Punto de venta Jazmin': this.pvJazmin,
      'Punto de venta Chapinero': this.pvChapinero,
      'Punto de venta Kennedy': this.pvKennedy,
    }
  };

  options = {
    layers: [this.streetMaps, this.pvJazmin, this.pvChapinero, this.pvKennedy],
    zoom: 13,
    center: latLng([4.6264063, -74.0914447])
  };


  constructor(
    router: Router,
    private headerServices: HeaderServices
  ) {
    this.routes = filterRoutesWithPrefix(router, '');
  }

  ngOnInit() {
    this.headerServices.setModel('assets/images/icon/promociones-icon.png', 'LOGYCA / ANALÍTICA', true);
  }

  public onRender = (args: any): void => {
    const chart = args.sender;

    // get the axes
    const valueAxis = chart.findAxisByName('valueAxis');
    const categoryAxis = chart.findAxisByName('categoryAxis');

    // get the coordinates of the value at which the plot band will be rendered
    const valueSlot = valueAxis.slot(this.plotValue);

    // get the coordinates of the entire category axis range
    const range = categoryAxis.range();
    const categorySlot = categoryAxis.slot(range.min, range.max);

    // draw the plot band based on the found coordinates
    const line = new Path({
      stroke: {
        color: '#E74C3C',
        width: 3,
        dashType: 'dot'
      }
    }).moveTo(valueSlot.origin)
      .lineTo(categorySlot.topRight().x, valueSlot.origin.y);

    const label = new Text('META 2%', [0, 0], {
      fill: {
        color: '#E74C3C'
      },
      font: '15px'
    });
    const bbox = label.bbox();
    label.position([categorySlot.topRight().x - bbox.size.width, valueSlot.origin.y - bbox.size.height]);

    const group = new Group();
    group.append(line, label);

    // Draw on the Chart surface to overlay the series
    chart.surface.draw(group);

    // Or as a first element in the pane to appear behind the series
    // chart.findPaneByIndex(0).visual.insert(0, group);
  }

  public goalPerformance = (args: any): void => {
    const chart = args.sender;

    // get the axes
    const valueAxis = chart.findAxisByName('valueAxis');
    const categoryAxis = chart.findAxisByName('categoryAxis');

    // get the coordinates of the value at which the plot band will be rendered
    const valueSlot = valueAxis.slot(this.goalPerformanceValue);

    // get the coordinates of the entire category axis range
    const range = categoryAxis.range();
    const categorySlot = categoryAxis.slot(range.min, range.max);

    // draw the plot band based on the found coordinates
    const line = new Path({
      stroke: {
        color: '#2ECC71',
        width: 3,
        dashType: 'dot'
      }
    }).moveTo(valueSlot.origin)
      .lineTo(categorySlot.topRight().x, valueSlot.origin.y);

    const label = new Text('META 2%', [0, 0], {
      fill: {
        color: '#82E0AA'
      },
      font: '15px'
    });
    const bbox = label.bbox();
    label.position([categorySlot.topRight().x - bbox.size.width, valueSlot.origin.y - bbox.size.height]);

    const group = new Group();
    group.append(line, label);

    // Draw on the Chart surface to overlay the series
    chart.surface.draw(group);

    // Or as a first element in the pane to appear behind the series
    // chart.findPaneByIndex(0).visual.insert(0, group);
  }


}
