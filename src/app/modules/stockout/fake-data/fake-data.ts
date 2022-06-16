export const colorPortfolio = ['#FFC300', '#EC7063'];

export const portfolioActivation = [
  { category: 'Activo', value: 97.3 },
  { category: 'Descontinuado', value: 2.7 }
];

export const stockoutTrendAxes = [{
  name: 'COP',
  title: 'COP',
  color: '#F4D03F',
  format: '0,0',
}, {
  name: 'Porcentaje',
  title: 'Porcentaje',
  color: '#EC7063',
  format: '0 %',
  }];

export const categoriesStockoutTrend = ['SEM 44', 'SEM 45', 'SEM 46', 'SEM 47', 'SEM 48', 'SEM  49'];

export const crossingValues: number[] = [0, 100];

export const sparklineStockout = [
  936, 968, 1025, 999, 998, 1014, 1017, 1010, 1010, 1007
];

export const categoriesStockoutTreeCadena = ['Cliente 1', 'Cliente 2', 'Cliente 3', 'Cliente 3', 'Cliente 5', 'Cliente 6', 'Cliente 7'];

export const stockoutTreeCadena = [100123, 105276, 125310, 132212, 112240, 113156, 10298];

export const categoriesStockoutTreeProducto = ['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4', 'Categoria 5', 'Categoria 6', 'Categoria 7'];

export const stockoutTreeProducto = [100123, 105276, 125310, 132212, 112240, 113156, 10298];

export const categoriesForecastStockout = ['PV Colina', 'PV Restrepo', 'PV Chapinero', 'PV 80', 'PV 13', 'PV Centenario', 'PV Bavaria', 'PV C. Jardin', 'PV Colseguros', 'PV Bolivar', 'PV Nieves', 'PV C. Montes', 'PV 24', 'PV 51', 'PV Galerias', 'PV Villamayor', 'PV Alamedas', 'PV Tunal', 'PV Quirinal', 'PV 19', 'PV Esperanza', 'PV Unilago', 'PV Heroes'];

export const forecastStockout = [{
  name: 'Previsión',
  data: [12917, 11275, 8658, 7548, 5957, 7124, 9984, 12560, 13235, 7578, 8548, 10745, 9658, 4584, 8985, 12854, 9845, 7864, 6321, 7216, 9365, 9233, 6742],
  color: '#E74C3C',
}];

export const colordetailstock = ['#FFC300', '#EC7063'];

export const detailstock = [
  { category: 'Disponible', value: 67.3 },
  { category: 'Agotado', value: 32.7 }
];

export const participationCausalAviable = [
  { category: 'Góndola no abastecida', value: 16.8, color: '#EC7063' },
  { category: 'Inexactitud en el inventario', value: 18.2, color: '#AF7AC5' },
  { category: 'Proveedor no entrego producto', value: 45.5, color: '#5499C7' },
  { category: 'Producto no solicitado a Prov.', value: 12.3, color: '#48C9B0' },
  { category: 'Producto no solicitado a CEDI', value: 4.5, color: '#F4D03F' },
  { category: 'Otras', value: 2.7, color: '#F39C12' }
];

export const participationCausalStock = [
  { category: 'Góndola no abastecida', value: 6, color: '#EC7063' },
  { category: 'Inexactitud en el inventario', value: 5.2, color: '#AF7AC5' },
  { category: 'Proveedor no entrego producto', value: 45.5, color: '#5499C7' },
  { category: 'Producto no solicitado a Prov.', value: 26.3, color: '#48C9B0' },
  { category: 'Producto no solicitado a CEDI', value: 15.8, color: '#F4D03F' },
  { category: 'Otras', value: 1.2, color: '#F39C12' }
];

export const categoriesClient = ['Cliente 1', 'Cliente 2', 'Cliente 3', 'Cliente 3', 'Cliente 5', 'Cliente 6', 'Cliente 7', 'Cliente 8', 'Cliente 9'];

export const customerCausal = [{
  causal: 'Góndola no abastecida',
  data: [15, 19, 11, 12, 35, 14, 26, 14, 11],
  color: '#EC7063'
},
{
  causal: 'Inexactitud en el inventario ',
  data: [18, 22, 12, 15, 12, 11, 15, 13, 16],
  color: '#AF7AC5'
},
{
  causal: 'Proveedor no entrego el producto',
  data: [12, 12, 13, 21, 14, 19, 17, 12, 25],
  color: '#5499C7'
},
{
  causal: 'Producto no solicitado a proveedor',
  data: [21, 32, 25, 25, 12, 11, 12, 21, 20],
  color: '#48C9B0'
},
{
  causal: 'Producto no solicitado a CEDI',
  data: [25, 10, 21, 21, 22, 38, 22, 31, 20],
  color: '#F4D03F'
}, {
  causal: 'Otros',
  data: [9, 5, 18, 6, 5, 7, 8, 9, 8],
  color: '#F39C12'
  }];

export const categoriesMonth = ['Ene 2018', 'Feb 2018', 'Mar 2018', 'Abr 2018', 'May 2018', 'Jun 2018', 'Jul 2018', 'Ago 2018', 'Sep 2018', 'Oct 2018', 'Nov 2018', 'Dic 2018'];


export const stockoutEvolutionCausal = [
  {
      causal: 'Góndola no abastecida',
      data: [58, 98, 58, 96, 87, 98, 58, 69, 78, 82, 81, 93],
      color: '#F1C40F',
      lineType: 'solid',
      lineWidth: 2,
  }, {
      causal: 'Producto no solicitado a proveedor',
      data: [78, 95, 78, 48, 75, 72, 95, 83, 45, 65, 87, 95],
      color: '#48C9B0',
      lineType: 'solid',
      lineWidth: 2,
  }, {
      causal: 'Proveedor no entrego el producto',
      data: [68, 48, 75, 95, 78, 85, 75, 48, 75, 95, 64, 48],
      color: '#5499C7',
      lineType: 'solid',
      lineWidth: 2,
  }, {
      causal: 'Total del agotado',
      data: [98, 58, 85, 98, 88, 95, 85, 58, 85, 98, 74, 68],
      color: '#EC7063',
      lineType: 'dot',
      lineWidth: 4,
  }];

  export const stockoutTrend = [{
    type: 'column',
    data: [12680, 11320, 10580, 11250, 9582, 13521],
    stack: true,
    name: 'Costo de Agotado',
    color: '#F4D03F',
    format: '0,0',
}, {
    type: 'line',
    data: [0.10, 0.8, 0.7, 0.6, 0.7, 0.11],
    name: 'Agotado Total (%)',
    color: '#EC7063',
    axis: 'Porcentaje',
    format: '0',
}, {
    type: 'line',
    data: [0.38, 0.22, 0.19, 0.14, 0.26, 0.48],
    name: 'Agotado por Desabastecimiento (%)',
    color: '#85C1E9',
    axis: 'Porcentaje',
    format: '0',
}, {
    type: 'line',
    data: [0.28, 0.12, 0.9, 0.4, 0.6, 0.35],
    name: 'Agotado por Rotación (%)',
    color: '#3498DB',
    axis: 'Porcentaje',
    format: '0',
}];

export const customerPerformance = [{
  cliente: 'VOID',
  historyData: [58, 98, 58, 96, 87, 98, 58, 69, 78],
  color: '#E74C3C'
}, {
  cliente: 'OO $',
  historyData: [45, 65, 32, 65, 75, 72, 32, 52, 45],
  color: '#78281F'
}];