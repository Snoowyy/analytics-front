import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dictionary'
})
export class DictionaryPipe implements PipeTransform {

  transform(value: any, args?: string): string {
    if (value == null || value === undefined) return null;
    if (Number.isInteger(value)) {
      if (value === 0) return 'lunes';
      if (value === 1) return 'martes';
      if (value === 2) return 'miercoles';
      if (value === 3) return 'jueves';
      if (value === 4) return 'viernes';
      if (value === 5) return 'sabado';
      if (value === 6) return 'domingo';
    } else {
      value = value.toLowerCase();
      if (value === 'daily' || value === 'd') return 'diario';
      if (value === 'weekly' || value === 'w') return 'semanal';
      if (value === 'monthly' || value === 'm') return 'mensual';
      if (value === 'yearly') return 'anual';
    }
  }

}
