import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { IconDirective } from '@coreui/icons-angular';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service'; 
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent {

  model = {
    username: '',
    password: ''
  };

  constructor(private authService: ApiService, private router: Router) { }

  onSubmit() {
    if (this.model.username && this.model.password) {
      this.authService.login(this.model).subscribe(
        response => {
          if (response.message === 'Login successful') {
            console.log('Login successful:', response);
  
            // Redirect to dashboard
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Login failed:', response);
            // Handle failed login (e.g., display error message)
          }
        },
        error => {
          // Handle login error
          console.error('Login error', error);
        }
      );
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
