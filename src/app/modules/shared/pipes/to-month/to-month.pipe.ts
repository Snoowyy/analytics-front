import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toMonth'
})
export class ToMonthPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    if (!value) return null;
    const result = (
      value === '-01' ? 'enero' :
      value === '-02' ? 'febrero' :
      value === '-03' ? 'marzo' :
      value === '-04' ? 'abril' :
      value === '-05' ? 'mayo' :
      value === '-06' ? 'junio' :
      value === '-07' ? 'julio' :
      value === '-08' ? 'agosto' :
      value === '-09' ? 'septiembre' :
      value === '-10' ? 'octubre' :
      value === '-11' ? 'noviembre' :
      value === '-12' ? 'diciembre' :
      null
    );
    return result;
  }

}
