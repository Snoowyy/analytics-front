import { UpdateInformation } from "../state/updateInformation";
import { Multiselect } from "../../shared/components/multiselect-filter/state";

export let dataActualization: UpdateInformation[] = [
  {
    glnretailer_name: 'Cliente 1',
    status: 'updated',
    last_update: new Date(2019, 1, 10),
    sale: 456789,
    days: 3,
    files: 5,
    point_sales: 18,
    products: 213
  },
  {
    glnretailer_name: 'Cliente 2',
    status: 'outdated',
    last_update: new Date(2019, 1, 8),
    sale: 456789,
    days: 3,
    files: 5,
    point_sales: 18,
    products: 213
  },
  {
    glnretailer_name: 'Cliente 3',
    status: 'updated',
    last_update: new Date(2019, 1, 10),
    sale: 456789,
    days: 3,
    files: 5,
    point_sales: 18,
    products: 213
  },
  {
    glnretailer_name: 'Cliente 4',
    status: 'updated',
    last_update: new Date(2019, 1, 10),
    sale: 456789,
    days: 3,
    files: 5,
    point_sales: 18,
    products: 213
  },
  {
    glnretailer_name: 'Cliente 5',
    status: 'progress',
    last_update: new Date(2019, 1, 10),
    sale: 456789,
    days: 3,
    files: 5,
    point_sales: 18,
    products: 213
  },
  {
    glnretailer_name: 'Cliente 6',
    status: 'outdated',
    last_update: new Date(2019, 1, 8),
    sale: 456789,
    days: 3,
    files: 5,
    point_sales: 18,
    products: 213
  },
  {
    glnretailer_name: 'Cliente 5',
    status: 'progress',
    last_update: new Date(2019, 1, 10),
    sale: 456789,
    days: 3,
    files: 5,
    point_sales: 18,
    products: 213
  },
  {
    glnretailer_name: 'Cliente 6',
    status: 'updated',
    last_update: new Date(2019, 1, 8),
    sale: 456789,
    days: 3,
    files: 5,
    point_sales: 18,
    products: 213
  },
  {
    glnretailer_name: 'Cliente 6',
    status: 'progress',
    last_update: new Date(2019, 1, 8),
    sale: 456789,
    days: 3,
    files: 5,
    point_sales: 18,
    products: 213
  }
];

export let dataScheduledDownload = [{
  'cadena': 'Cliente 1',
  'frecuencia': 'Semanal',
  'ejecucion': 'Lunes',
},
{
  'cadena': 'Cliente 2',
  'frecuencia': 'Mensual',
  'ejecucion': 'Martes',
}];

export let userEmail = [{
  'usuario': 'Usuario 1',
  'email': 'usuario1@myemail.com',
  'action': '',
}, {
  'usuario': 'Usuario 2',
  'email': 'usuario2@myemail.com',
  'action': '',
}, {
  'usuario': 'Usuario 3',
  'email': 'usuario3@myemail.com',
  'action': '',
}, {
  'usuario': 'Usuario 4',
  'email': 'usuario4@myemail.com',
  'action': '',
}
];

export let searchListCadena = [
  'Cliente 1',
  'Cliente 2',
  'Cliente 3',
  'Cliente 4',
  'Cliente 5',
  'Cliente 6'
];

export let clients: Multiselect[] = [
  { name: 'Client 1', type: 'client', gln: 1 },
  { name: 'Client 2', type: 'client', gln: 2 },
  { name: 'Client 3', type: 'client', gln: 3 },
  { name: 'Client 4', type: 'client', gln: 4 },
  { name: 'Client 5', type: 'client', gln: 5 }
];
