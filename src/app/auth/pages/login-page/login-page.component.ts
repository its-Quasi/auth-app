import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  private formBuilder = inject(FormBuilder)

  form = this.formBuilder.group({
    email : [
      '',
      [Validators.required, Validators.email]
    ],
    password : [
      '',
      [Validators.required, Validators.minLength(6)]
    ]
  })


  login() {
    console.log(this.form.value)
  }
}
