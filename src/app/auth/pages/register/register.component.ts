import { Component, inject, signal } from '@angular/core';
import { FormUtils } from '../../utils/FormUtils';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule,
    // JsonPipe
  ],
  templateUrl: './register.component.html',
})
export default class RegisterComponent {
  formUtils = FormUtils
  fb = inject(FormBuilder)
  hasError = signal<boolean>(false)
  authService = inject(AuthService)

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    name: ['', [Validators.required, Validators.pattern(this.formUtils.namePattern)]
    // Aqui iria la validacion asincrona, por si existe el mismo usuario con el mismo nombre
     ],
    documentType: ['', [Validators.required]],
    numberIdentification: ['', [Validators.required, Validators.minLength(8)]],
    terms: [false, Validators.requiredTrue]
  })

  onSubmit(){
    if(this.registerForm.invalid) {
      this.registerForm.markAllAsTouched()
      this.hasError.set(true)

      setTimeout(() => {
        this.hasError.set(false)
      }, 2000)
      return;
    }

    console.log(this.registerForm.value)

  }
}
