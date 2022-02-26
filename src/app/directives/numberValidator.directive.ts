import { Directive, Input } from '@angular/core';
import { AbstractControl, FormControl, Validator, ValidatorFn, Validators } from '@angular/forms';

@Directive({
  selector: '[appNumberValidator]'
})
export class NumberValidatorDirective  {
  static checkLimit(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        }
        return null;
    };
  }
   constructor() { }

}
