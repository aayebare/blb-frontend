import { Component } from '@angular/core';
import { IconDirective, IconModule } from '@coreui/icons-angular';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [CommonModule, ContainerComponent, FormsModule,IconModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective]
})
export class RegisterComponent {

  model: any = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private authService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getRole()
  }

  onSubmit() {
    if (this.model.password !== this.model.confirmPassword) {
      // Handle password mismatch
      console.error('Passwords do not match!');
      return;
    }

    this.authService.register(this.model).subscribe(
      response => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']); // Navigate to login page or another page
      },
      error => {
        console.error('Registration error:', error);
      }
    );
  }

}
