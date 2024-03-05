import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'authApp';
  private authService = inject(AuthService)
  private router = inject(Router)
  public isFinishAuth = computed<boolean>(() => {
    if(this.authService.authState() === AuthStatus.CHEKING) return false
    return true
  })

  public authStatusEffect = effect(() => {
    switch(this.authService.authState()) {
      case AuthStatus.CHEKING: 
        return
      case AuthStatus.AUTHENTICATED:
        this.router.navigateByUrl('/dashboard') // maybe u can save route in local storage and redirect user
        return
      case AuthStatus.NOT_AUTHENTICATED:
        this.router.navigateByUrl('/auth/login')
        return
    }
  })
}   
