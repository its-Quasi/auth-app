import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  //Dependencies and services
  private authService = inject(AuthService)
  private formBuilder = inject(FormBuilder)
  private router = inject(Router)

  form = this.formBuilder.group({
    email: [
      'maasdfr@gmail.com',
      [Validators.required, Validators.email]
    ],
    password: [
      'csdcsacsda',
      [Validators.required, Validators.minLength(6)]
    ]
  })


  login() {
    if (this.form.invalid) return
    const { email, password } = this.form.value;
    console.log(email, password)
    this.authService.login(email || '', password || '')
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (error) => {
          Swal.fire({ icon: "error", title: "Oops...", text: error });
        }
      })
  }
}
