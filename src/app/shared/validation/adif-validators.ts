import { AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import * as moment from 'moment';

export class AdifValidators {
    static forbiddenValue(control: AbstractControl): ValidationErrors | null {
        if (control.value && control.value !== '') {
            return  typeof control.value !== 'string' ? null :  { forbidden: true };
        }
    }

    static validateFirstDayOfMonth(control: AbstractControl): ValidationErrors | null {
        if (control) {
            if ( typeof control.value === 'object') {
                    const date: Date = control.value;
                    return date.getDate() === 1 ? null :  { notFirstDayOfMonth: true };
            }
        }
    }

    static compareDate(control: AbstractControl): ValidationErrors | null {
          if (control) {
            const fechaCierre = control.get('fecha_cierre').value;
            const periodo = control.get('periodo').value;
            if (periodo && fechaCierre ) {
                return moment(periodo).isSameOrBefore(fechaCierre) ? null : {'EndDatePriorToStartDate': true};
            }
            return null;
          }
    }
}
