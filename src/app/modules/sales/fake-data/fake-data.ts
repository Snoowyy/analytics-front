import * as faker from 'faker';
import { TotalSale } from '../components/total-sales/state';
import { SalesByTimeSeries } from '../state/salesByTimeSeries';
import { SalesBehaviorByTimeSeries } from '../state/salesBehaviorByTimeSeries';
import { SalesRanking } from '../state/salesRanking';
import { SalesBehavior } from '../state/salesBehavior';
import { SalesByClient } from '../state/salesByClient';
import { SalesByCategory } from '../state/salesByCategory';
import { PriceSensitivityTimeSeries } from '../state/priceSensitivityTimeSeries';

export let totalSales = <TotalSale>{
  total: faker.random.number({ min: 80000000, max: 94500000 }),
  qty: faker.random.number({ min: 97000, max: 340000 }),
  'variation-ytd': faker.random.number({ min: -10, max: 10 }),
  'variation-mtd': faker.random.number({ min: -10, max: 10 })
};

export let ventasCadena: SalesByClient[] = [
  {
    name: 'Cliente 1',
    sales: 15000,
  },
  {
    name: 'Cliente 2',
    sales: 35000,
  },
  {
    name: 'Cliente 3',
    sales: 45000,
  },
  {
    name: 'Cliente 4 asociados frontend f',
    sales: 8000,
  },
  {
    name: 'Cliente 5',
    sales: 5000,
  },
  {
    name: 'Cliente 6',
    sales: 4000,
  },
  {
    name: 'Cliente 7',
    sales: 3000,
  },
  {
    name: 'Cliente 8',
    sales: 2500,
  },
  {
    name: 'Cliente 9',
    sales: 2500,
  },
  {
    name: 'Cliente 10',
    sales: 2000,
  },
  {
    name: 'Cliente 11',
    sales: 1000,
  },
  {
    name: 'Cliente 12',
    sales: 1000,
  }
];

export let ventasCategoria: SalesByCategory[] = [
  {
    name: 'Categoria 1',
    sales: 12000,
  },
  {
    name: 'Categoria 2',
    sales: 25000,
  },
  {
    name: 'Categoria 3',
    sales: 15000,
  },
  {
    name: 'Categoria 4',
    sales: 25000,
  },
  {
    name: 'Categoria 5',
    sales: 45000,
  },
  {
    name: 'Categoria 6',
    sales: 15000,
  }
];

export let monthlySaleByCient: SalesByTimeSeries = {
  time_series: ['Feb 2016', 'Jan 2016', 'Mar 2016'],
  data: [
    {
      client: 'Jumbo',
      sales: [0, 192113775.86, 0]
    },
    {
      client: 'Sin información',
      sales: [4666520865.69003, 4530635067.45002, 2068269834.48]
    },
    {
      client: 'La 14',
      sales: [0, 376701902.06, 0]
    },
    {
      client: 'Exito',
      sales: [0, 216001969.41, 0]
    },
    {
      client: 'Metro',
      sales: [0, 239326786.25, 0]
    }
  ]
};

export let salesMaxMin: SalesBehaviorByTimeSeries[] = [
  {
    lower: 1.3,
    q1: 2.15,
    median: 2.95,
    q3: 3.725,
    upper: 4.7,
    mean: 2.9,
    outliers: [1, 9],
    date: 'Ene 2018'
  },
  {
    lower: 2,
    q1: 3.825,
    median: 5.45,
    q3: 6.425,
    upper: 8.2,
    mean: 5.2,
    outliers: [1.5, 2, 8.9],
    date: 'Feb 2018'
  },
  {
    lower: 3.8,
    q1: 4.725,
    median: 5.55,
    q3: 5.75,
    upper: 8.7,
    mean: 5.5,
    outliers: [],
    date: 'Mar 2018'
  },
  {
    lower: 3,
    q1: 4.375,
    median: 4.95,
    q3: 5.85,
    upper: 8,
    mean: 5.2,
    outliers: [3, 9.5],
    date: 'Abr 2018'
  },
  {
    lower: 2.5,
    q1: 3.925,
    median: 4.15,
    q3: 4.45,
    upper: 5.1,
    mean: 4.1,
    outliers: [],
    date: 'May 2018'
  },
  {
    lower: 2.4,
    q1: 3.725,
    median: 4.95,
    q3: 5.85,
    upper: 7.7,
    mean: 4.9,
    outliers: [2.1, 8.3, 9.8],
    date: 'Jun 2018'
  },
  {
    lower: 1.7,
    q1: 2.3,
    median: 3.9,
    q3: 5,
    upper: 5.5,
    mean: 3.7,
    outliers: [1.1, 9.1],
    date: 'Jul 2018'
  },
  {
    lower: 2.2,
    q1: 2.5,
    median: 3.1,
    q3: 3.975,
    upper: 4.3,
    mean: 3.2,
    outliers: [1.6, 1.8, 9.8],
    date: 'Ago 2018'
  },
  {
    lower: 1.9,
    q1: 2.7,
    median: 3.35,
    q3: 4.575,
    upper: 5.7,
    mean: 3.6,
    outliers: [1.1, 8.3],
    date: 'Sep 2018'
  },
  {
    lower: 1.7,
    q1: 2.65,
    median: 3.3,
    q3: 4.05,
    upper: 5,
    mean: 3.4,
    outliers: [],
    date: 'Oct 2018'
  },
  {
    lower: 1.4,
    q1: 2.25,
    median: 3.3,
    q3: 4.65,
    upper: 5.7,
    mean: 3.4,
    outliers: [],
    date: 'Nov 2018'
  },
  {
    lower: 1.9,
    q1: 2.85,
    median: 4,
    q3: 4.45,
    upper: 6.1,
    mean: 3.9,
    outliers: [1, 1.2],
    date: 'Dic 2018'
  }
];

export let salesRanking: SalesRanking = {
  name: 'Productos',
  sales: [
    {
      name: 'Producto 1',
      value: 10900
    },
    {
      name: 'Producto 2',
      value: 9943
    },
    {
      name: 'Producto 3',
      value: 8848
    },
    {
      name: 'Producto 4',
      value: 8284
    },
    {
      name: 'Producto 5',
      value: 7263
    },
    {
      name: 'Producto 6',
      value: 6801
    },
    {
      name: 'Producto 7',
      value: 5890
    },
    {
      name: 'Producto 8',
      value: 4238
    },
    {
      name: 'Producto 9',
      value: 3867
    },
    {
      name: 'Producto 10',
      value: 3855
    }
  ]
};

export let salesBehavior: SalesBehavior[] = [
  { name: 'Categoria 1', sales: 10907 },
  { name: 'Categoria 2', sales: 10907 },
  { name: 'Categoria 3', sales: 8976 },
  { name: 'Categoria 4', sales: 12897 },
  { name: 'Categoria 5', sales: 6578 }
];

export let priceSensitivity: PriceSensitivityTimeSeries = {
  categories: [],
  elasticity: 2,
  time_series: ['Ene 01', 'Ene 02', 'Ene 03', 'Ene 04', 'Ene 05', 'Ene 06', 'Ene 07', 'Ene 08', 'Ene 09', 'Ene 10', 'Ene 11', 'Ene 12', 'Ene 13', 'Ene 14', 'Ene 15', 'Ene 16', 'Ene 17', 'Ene 18', 'Ene 19', 'Ene 20', 'Ene 21', 'Ene 22', 'Ene 23', 'Ene 24', 'Ene 25', 'Ene 26', 'Ene 27', 'Ene 28', 'Ene 29', 'Ene 30'],
  data: [
    {
      type: 'column',
      data: [8247, 9891, 7979, 4117, 5086, 7778, 7991, 9884, 5509, 5893, 7656, 4867, 4859, 4631, 3297, 4865, 5335, 8819, 6987, 3333, 2295, 4658, 7490, 2820, 7648, 4750, 9932, 3250, 7820, 9075],
      stack: true,
      name: 'Ventas',
      color: '#F1C40F'
    }, {
      type: 'line',
      data: [1967, 4498, 9495, 6165, 7215, 8469, 3558, 4401, 9854, 6220, 5481, 1957, 7541, 9129, 7257, 6366, 3533, 7471, 3260, 6004, 7619, 9099, 6471, 4170, 7192, 4621, 3682, 9683, 3302, 6576],
      stack: false,
      name: 'Inventarios',
      color: '#E74C3C',
      axis: 'mpg'
    }
  ],
  axis: [
    {
      name: 'mpg',
      title: 'Precio Promedio',
      color: '#F1C40F'
    },
    {
      title: 'Ventas',
      color: '#E74C3C'
    }
  ]
};
