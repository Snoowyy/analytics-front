import { circle } from 'leaflet';
import { Notification } from '../state/notification';
import { Multiselect } from '../modules/shared/components/multiselect-filter/state';
import { InventoryDaysByClient } from '../modules/inventory/state/inventoryDaysByClient';
import { InventoryDaysByCategory } from '../modules/inventory/state/inventoryDaysByCategory';
import { VsComparationTimeSeriesState } from '../modules/inventory/state/vsComparationTimeSeries';

export let categoriesMonth = ['Ene 2018', 'Feb 2018', 'Mar 2018', 'Abr 2018', 'May 2018', 'Jun 2018', 'Jul 2018', 'Ago 2018', 'Sep 2018', 'Oct 2018', 'Nov 2018', 'Dic 2018'];

export let inventoryDaysByClient: InventoryDaysByClient[] = [
  {
    name: 'PV Colina 33',
    value: 12917
  },
  {
    name: 'PV Restrepo',
    value: 11275
  },
  {
    name: 'PV Chapinero',
    value: 8658
  },
  {
    name: 'PV 80',
    value: 7548
  },
  {
    name: 'PV 13',
    value: 5957
  },
  {
    name: 'PV Centenario',
    value: 7124
  },
  {
    name: 'PV Bavaria',
    value: 9984
  },
  {
    name: 'PV C. Jardin',
    value: 12560
  },
  {
    name: 'PV Colseguros',
    value: 13235
  },
  {
    name: 'PV Bolivar',
    value: 7578
  },
  {
    name: 'PV Nieves',
    value: 8548
  },
  {
    name: 'PV C. Montes',
    value: 10745
  }
];

export let inventoryDaysByCategory: InventoryDaysByCategory[] = [
  {
    name: 'Categoria 1',
    value: 11917
  },
  {
    name: 'Categoria 2',
    value: 13275
  }
];

export let vsComparationTimeSeries: VsComparationTimeSeriesState[] = [
  { date: 'Lunes', sales: 200, inventory: 250 },
  { date: 'Martes', sales: 550, inventory: 600 },
  { date: 'Miercoles', sales: 300, inventory: 350 }
];

export let crossingValues: number[] = [0, 100];

export let onTime = [{
  kind: 'On Time',
  share: 83,
  color: '#5DADE2',
}, {
  kind: 'shortage',
  share: 17,
  color: '#EAEDED',
}];

export let inFull = [{
  kind: 'In Full',
  share: 79,
  color: '#5DADE2',
}, {
  kind: 'shortage',
  share: 21,
  color: '#EAEDED',
}];

export let otif = [{
  kind: 'OTIF',
  share: 81,
  color: '#5DADE2',
}, {
  kind: 'shortage',
  share: 19,
  color: '#EAEDED',
}];

export let clientServiceLevel = ['Cliente 1', 'Cliente 2', 'Cliente 3', 'Cliente 4', 'Cliente 5', 'Cliente 6', 'Cliente 7'];
export let categoryServiceLevel = ['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4', 'Categoria 5', 'Categoria 6', 'Categoria 7'];

export let indicatorByClient = [20, 40, 45, 75, 50, 57, 98];
export let indicatorByCategory = [54, 65, 48, 54, 75, 98, 45, 78];

export let historyData = [{
  cliente: 'Cliente 1',
  historyData: [58, 98, 58, 96, 87, 98, 58, 69, 78, 82, 81, 93]
}, {
  cliente: 'Cliente 2',
  historyData: [78, 95, 78, 48, 75, 72, 95, 83, 45, 65, 87, 95]
}, {
  cliente: 'Cliente 3',
  historyData: [68, 48, 75, 95, 78, 85, 75, 48, 75, 95, 64, 48]
}, {
  cliente: 'Cliente 4',
  historyData: [98, 54, 68, 97, 78, 54, 78, 45, 95, 65, 35, 15]
}, {
  cliente: 'Cliente 5',
  historyData: [85, 95, 67, 94, 57, 65, 15, 75, 35, 99, 75, 98]
}];

export let causalList =
  [
    'Alineación de portafolio',
    'Diferencia en las cantidades negociadas ',
    'Diferencia en precio',
    'Errores de transmisión de información',
    'Agotado del proveedor',
    'Incidencia operativa del proveedor',
    'Mercancia no cumple condiciones requeridas',
    'Crédito y cartera'
  ];

export let causal = [
  {
    causal: 'Alineacion de portafolio',
    value: 0.42,
    color: '#EC7063',
  },
  {
    causal: 'Diferencia en precio',
    value: 0.58,
    color: '#AF7AC5',
  }, {
    causal: 'Diferencia en cantidades',
    value: 0.42,
    color: '#5499C7',
  }, {
    causal: 'Error en transmición de informacion',
    value: 0.42,
    color: '#48C9B0',
  }, , {
    causal: 'Agotado proveedor',
    value: 0.42,
    color: '#F4D03F',
  }, {
    causal: 'Crédito y Cartera',
    value: 0.42,
    color: '#F39C12',
  },
  {
    causal: 'Mercancia no cumple condiciones',
    value: 0.42,
    color: '#C0392B'
  }
];

export let evolutionCausal = [{
  cliente: 'Alineacion de portafolio',
  historyData: [58, 98, 58, 96, 87, 98, 58, 69, 78, 82, 81, 93],
  color: '#EC7063'
}, {
  cliente: 'Diferencia en precio',
  historyData: [78, 95, 78, 48, 75, 72, 95, 83, 45, 65, 87, 95],
  color: '#AF7AC5'
}, {
  cliente: 'Crédito y Cartera',
  historyData: [68, 48, 75, 95, 78, 85, 75, 48, 75, 95, 64, 48],
  color: '#F39C12'
}];


export let causalManager = [{
  id: 1,
  causal: 'Sin Asignar',
  asignado: 'N/A',
  indicador: 'N/A',
  gestion: '',
  descripcion: 'Sin Asignar',
},
{
  id: 2,
  causal: 'Alineacion de portafolio',
  asignado: 'Proveedor',
  indicador: '15%',
  gestion: '',
  descripcion: 'Órdenes de compra de producto descontinuado, suspendido o inactivo',
},
{
  id: 3,
  causal: 'Agotado por proveedor',
  asignado: 'Proveedor',
  indicador: '12%',
  gestion: '',
  descripcion: 'Inhabilidad de cumplir pedido por falta de producto',
}
];


export let allocationOptions = [
  {
    producto: 'Producto 1',
    ordenCompra: '00123',
    fecha: new Date(2018, 11, 25),
    select: '',
    asignar: '',
    guardar: '',
  },
  {
    producto: 'Producto 2',
    ordenCompra: '00123',
    fecha: new Date(2018, 11, 25),
    select: '',
    asignar: '',
    guardar: '',
  }, {
    producto: 'Producto 3',
    ordenCompra: '00321',
    fecha: new Date(2018, 11, 3),
    select: '',
    asignar: '',
    guardar: '',
  }
];

export let dataNotification: Notification[] = [
  {
    insights_type: 'Ventas por cadena',
    insights: [
      {
        id: 1,
        username: 'rleon',
        message: 'La cadena Multicadena desplazó al segundo lugar a la cadena Supercadena',
        saved: false,
        erased: false,
        created_at: '2019-01-25',
        expires_at: '2019-01-28',
        url: ''
      },
      {
        id: 2,
        username: 'rleon',
        message: 'La cadena con mayor variación en el período seleccionado fue Multicadena',
        saved: false,
        erased: false,
        created_at: '2019-01-25',
        expires_at: '2019-01-28',
        url: ''
      }
    ]
  },
  {
    insights_type: 'Ventas por categoria',
    insights: [
      {
        id: 3,
        username: 'rleon',
        message: 'La categoria con mayor decrecimiento vs el mismo período del año pasado fue Aseo',
        saved: false,
        erased: false,
        created_at: '2019-01-25',
        expires_at: '2019-01-28',
        url: ''
      }
    ]

  },
  {
    insights_type: 'Participación de las causales agotado',
    insights: [
      {
        id: 4,
        username: 'apolania',
        message: 'Las principales oportunidades de gestión son: Góndola no abastecida en PV Cliente1 chapinero y PV Cliente2 Colina. Inexactitud en el inventario PV Cliente 3 Country y PV Cliente 4 Ibagué.',
        saved: false,
        erased: false,
        created_at: '2019-01-25',
        expires_at: '2019-01-28',
        url: ''
      }
    ]
  },
  {
    insights_type: 'Participación de las causales agotado 5',
    insights: [
      {
        id: 5,
        username: 'hforigua',
        message: 'Las principales oportunidades de gestión son: Góndola no abastecida en PV Cliente1 chapinero y PV Cliente2 Colina. Inexactitud en el inventario PV Cliente 3 Country y PV Cliente 4 Ibagué.',
        saved: false,
        erased: false,
        created_at: '2019-01-25',
        expires_at: '2019-01-28',
        url: ''
      }
    ]
  }
];

export let multiselectFilter: Multiselect[] = [
  { gln: 1, name: 'Grupo Exito', type: 'client' },
  { gln: 2, name: 'Cencosud', type: 'client' },
  { gln: 3, name: 'Alkosto', type: 'client' },
  { gln: 4, name: 'Olimpica', type: 'client' },
  { gln: 5, name: 'Flamingo', type: 'client' },
  { gln: 20, region: 'Bogota', retailer: 1, name: 'Exito 170 Bogota', type: 'pv' },
  { gln: 21, region: 'Bogota', retailer: 1, name: 'Exito Chapinero Bogota', type: 'pv' },
  { gln: 22, region: 'Bogota', retailer: 1, name: 'Exito calle 45 Bogota', type: 'pv' },
  { gln: 23, region: 'Bogota', retailer: 1, name: 'Exito 20 de julio Bogota', type: 'pv' },
  { gln: 24, region: 'Bogota', retailer: 1, name: 'Exito tunal Bogota', type: 'pv' },
  { gln: 25, region: 'Bogota', retailer: 2, name: 'Metro autosur', type: 'pv' },
  { gln: 26, region: 'Bogota', retailer: 4, name: 'Alkosto vencia', type: 'pv' },
  { gln: 27, region: 'Bogota', retailer: 4, name: 'Olimpica corferias', type: 'pv' },
  { gln: 28, region: 'Cali', retailer: 5, name: 'Flamingo centro mayor', type: 'pv' },
  { gtin: 7702914222044, name: 'ESPAÑOLETAS', categories: ['Galletas', 'Colaciones', '60', ''], type: 'product' }
];
