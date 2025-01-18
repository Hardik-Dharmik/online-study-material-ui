import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function uniqueFileNameValidator(fileName: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const alreadyExistingFileName = fileName.includes(control.value);
        return alreadyExistingFileName ? { alreadyExistingFileName: true } : null;
    };
}