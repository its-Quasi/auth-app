import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private authService = inject(AuthService)
  private formBuilder = inject(FormBuilder)

  form = this.formBuilder.group({
    email: [
      'maasdfr@gmail.com',
      [Validators.required, Validators.email]
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(6)]
    ]
  })


  login() {
    if (this.form.invalid) return
    const { email, password } = this.form.value;

    this.authService.login(email || '', password || '')
      .subscribe({
        next: () => console.log('ahi miramos'),
        error: (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error
          });
        }
      })
  }
}
