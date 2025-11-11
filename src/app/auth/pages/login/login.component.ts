import { Component, inject, signal } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormUtils } from '../../utils/FormUtils';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, JsonPipe],
  templateUrl: './login.component.html',
})
export default class LoginComponent {

  authService = inject(AuthService)
  private fb = inject(FormBuilder)
  formUtils = FormUtils

  hasError = signal<boolean>(false)

  router = inject(Router)

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  })


  onSubmit(){
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      this.hasError.set(true)

      setTimeout(() => {
        this.hasError.set(false)
      }, 2000)
      return;
    }

    const {email = "", password = ""} = this.loginForm.value
    console.log({email, password})

    this.authService.login(email!, password!).subscribe(response => {
      console.log('Response: ', response)
      if (response) {
        this.router.navigateByUrl('/intranet')
        return;
      }

      this.hasError.set(true)

      setTimeout(() => {
        this.hasError.set(false)
      }, 2000)

    })

  }

}
