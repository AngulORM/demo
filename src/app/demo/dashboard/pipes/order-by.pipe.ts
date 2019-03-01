import {Pipe, PipeTransform} from '@angular/core';
import {isFunction} from 'rxjs/internal-compatibility';

@Pipe({
  name: 'orderBy'
})
export class OrderbyPipe implements PipeTransform {
  transform(value: any[], index: string = null, revert: boolean = false): any[] {
    const multiple = revert ? -1 : 1;

    if (!value || !Array.isArray(value)) {
      return value;
    }

    return value.sort((a: any, b: any): number => {
      let valA: any = a;
      let valB: any = b;

      if (index) {
        valA = a[String(index)];
        valB = b[String(index)];

        if (isFunction(valA)) {
          valA = a[String(index)]();
        } else if ((valA instanceof String) || (typeof (valA) === 'string')) {
          valA = valA.toLowerCase();
        }

        if (isFunction(valB)) {
          valB = b[String(index)]();
        } else if ((valB instanceof String) || (typeof (valB) === 'string')) {
          valB = valB.toLowerCase();
        }
      }

      if ((valA instanceof String) || (typeof (valA) === 'string')) {
        valA = this.accentFold(valA).trim();
      }
      if ((valB instanceof String) || (typeof (valB) === 'string')) {
        valB = this.accentFold(valB).trim();
      }

      if (valA > valB) {
        return multiple;
      }

      if (valA < valB) {
        return -1 * multiple;
      }

      return 0;
    });
  }

  accentFold(inStr: String): string {
    return inStr.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
