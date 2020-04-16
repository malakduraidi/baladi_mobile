import { FormControl, FormGroup } from '@angular/forms';
export class FormValidationService {
  static duplicatePassword(input: FormControl) {
    if (!input.root || !(input.root as FormGroup).controls) {
      return null;
    }

    const exactMatch = input.root.get('password').value === input.value;
    // return true;
    return exactMatch ? null : { mismatchedPassword: true };
  }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      required: 'THIS_FIELD_IS_REQUIRED',
      invalidCreditCard: 'IS_INVALID_CREDIT_CARD_NUMBER',
      invalidEmailAddress: 'INVALID_EMAIL_ADDRESS',
      mismatchedPassword: 'PASSWORD_DOES_NOT_MATCH',
      invalidPassword:
        'Invalid password. Password must be at least 6 characters long, and contain a number.',
      minLength: `MINIMUM_LENGTH ${validatorValue &&
        validatorValue.requiredLength}`,
      invalidMobileNumber: 'SHOULD_BE_NUMBER_BETWEEN_7_AND_15_DIGITS',
      maxLength: `MAXIMUM_LENGTH ${validatorValue &&
        validatorValue.requiredLength}`
    };

    return config[validatorName];
  }

  static creditCardValidator() {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    return (control: FormControl) => {
      if (
        control.value.match(
          // tslint:disable-next-line:max-line-length
          /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
        )
      ) {
        return null;
      } else {
        return { invalidCreditCard: true };
      }
    };
  }

  static minLength(minLength) {
    return (control: FormControl) => {
      const val = control.value;
      if (val.length >= minLength || control.value.length === 0) {
        return null;
      } else {
        return { minLength: { requiredLength: minLength } };
      }
    };
  }

  static maxLength(maxLength) {
    return (control: FormControl) => {
      const val = control.value;
      if (val.length <= maxLength || control.value.length === 0) {
        return null;
      } else {
        return { maxLength: { requiredLength: maxLength } };
      }
    };
  }

  static required() {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    return (control: FormControl) => {
      if (
        control.value.length !== 0 &&
        control.value !== '' &&
        control.value !== null &&
        control.value !== undefined
      ) {
        return null;
      } else {
        return { required: true };
      }
    };
  }

  static emailValidator() {
    // RFC 2822 compliant regex
    return (control: FormControl) => {
      if (
        control.value.match(
          // tslint:disable-next-line:max-line-length
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        )
      ) {
        return null;
      } else {
        if (control.value == '')
          return null
        return { invalidEmailAddress: true };
      }
    };
  }

  static passwordValidator() {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    return (control: FormControl) => {
      if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
        return null;
      } else {
        return { invalidPassword: true };
      }
    };
  }

  static mobileNumberValidator() {
    return (control: FormControl) => {
      // mobile number should be 10 digits
      const val = control.value;
      // only if it is used ( other wise you should use required)

      if (
        (String(val).length > 7 && String(val).length < 20 && !isNaN(val)) ||
        control.value.length === 0
      ) {
        // value is ok, use it

        return null;
      } else {
        return { invalidMobileNumber: true };
      }
    };
  }
}
