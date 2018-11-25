import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appEqualValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EqualValidatorDirective,
    multi: true,
  }]
})
export class EqualValidatorDirective implements Validator {
  @Input() appEqualValidator: string;
  validate(control: AbstractControl): ValidationErrors | null {
    const controlToCompare = control.parent.get(this.appEqualValidator);
    
    if (controlToCompare && controlToCompare.value !== control.value) {
      return {
        notEqual: true
      };
    }

    return null;
  }
}