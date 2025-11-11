import { FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `Este campo necesita como mínimo ${errors[key].requiredLength}`
        case 'pattern':
          if (errors[key].requirePattern === this.emailPattern){
            return 'El valor ingresado no es un correo'
          }
          return 'No cumple con el patrón'
        case 'default':
          return 'Comprobar sus datos'
      }
    }

    return null
  }

  static isValidField(form: FormGroup, field: string) {
    return (form.controls[field].touched && form.controls[field].errors)
  }

  static getError(form: FormGroup, field: string): string | null {

    if (!form.controls[field]) return null

    const errors = form.controls[field].errors ?? {}
    console.log({ errors })
    return this.getTextError(errors)

  }


}
