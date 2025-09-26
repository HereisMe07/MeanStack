import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomerService } from '../../services/customer.service.service';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-customer-create',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.css'
})
export class CustomerCreateComponent implements OnInit{
// This declares a private property of the class named customerService.
// private means it can only be accessed inside this class. You cannot use it directly in the template.
   private customerService = inject(CustomerService);
// Using inject() allows you to skip the constructor and directly assign the service to a property
 
  form!: FormGroup;

  router = inject(Router);
  
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      phone: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    // validate form
    if (this.form.valid) {
      this.customerService.post(this.form.value).subscribe(
        data => {
          console.log('data posted');
          this.router.navigate(['/']);
        },
        error => {
          console.error('error:', error);
        }
      )
    }
  }
 

  


}
