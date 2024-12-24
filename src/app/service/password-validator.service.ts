import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value;

    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isValidLength = value ? value.length >= 8 : false;

    return !value
      ? null
      : (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar || !isValidLength)
      ? { passwordStrength: true }
      : null;
  };
}
