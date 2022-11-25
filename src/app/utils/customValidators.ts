import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function AtLeastTwoWords(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isAtLeastTwoWords =
            control?.value?.split(' ').filter((x: string) => !!x && x.length > 0)
                .length >= 2
        if (!isAtLeastTwoWords) return { atLeastTwoWords: true }
        return null
    }
}
