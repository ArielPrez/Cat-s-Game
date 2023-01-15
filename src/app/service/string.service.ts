import { formatCurrency } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringService {

  constructor(@Inject(LOCALE_ID) public locale: string) { }

  public capitalize(value: string): string {

    let capitalized: string = value;

    if (value?.length > 0) {
      capitalized = value.charAt(0).toUpperCase();

      if (value.length > 1) {
        capitalized += value.substring(1).toLowerCase();
      }
    }

    return capitalized;
  }

  public appendSeparated(original: string,
                         additional: string,
                         separator: string): string {
    let separated: string = '';

    if (additional) {

      if (!original) {
        separated = '';
      } else if (original.length > 0) {

        if (separator === undefined) {
          separator = ',';
        }

        separated = original + separator;
      }

      separated += additional;
    } else {
      separated = original;
    }

    return separated;
  }

  public currency(value: number): string {
    return formatCurrency(value, this.locale, '$');
  }

}
