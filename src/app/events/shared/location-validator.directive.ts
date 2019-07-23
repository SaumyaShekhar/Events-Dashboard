import { Directive } from '@angular/core';
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';

@Directive({
// tslint:disable-next-line: directive-selector
    selector : '[validateLocation]',
    // add the location validator to the ng_validators of forms
    // multi is true - It means ng_validators contains a list of validators and we are adding a new one to the list
    // multi is false means we are rewriting the validator. 
    // It means NG_Validators will be overwritten by Location Validator and none of the default validators will work now.
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: LocationValidator,
        multi: true
    }]
})

export class LocationValidator implements Validator {
    validate(formGroup: FormGroup): {[key: string]: any} {
        const addressControl = formGroup.controls['address'];
        const cityControl = formGroup.controls['city'];
        const countryControl = formGroup.controls['country'];
        const onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];

        if ((addressControl && addressControl.value && cityControl && cityControl.value
            && countryControl && countryControl.value) || (onlineUrlControl && onlineUrlControl.value)) {
                return null;
        } else {
            return {validateLocation : false};
        }
    }
}
