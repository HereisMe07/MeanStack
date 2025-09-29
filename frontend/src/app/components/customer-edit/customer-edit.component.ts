import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer.service.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css'
})
export class CustomerEditComponent {
  private activatedRouter = inject(ActivatedRoute);
  private customerService = inject(CustomerService);
  customer!: Customer;
  customerId!: string;

  form!: FormGroup;
  router = inject(Router);

  ngOnInit(): void { 
    // Get the customer from The url
    this.customerId = this.activatedRouter.snapshot.params['id'];
    // init the form
    this.form = new FormGroup({
      name: new FormGroup('', Validators.required),
      email: new FormGroup('', [Validators.required, Validators.email]),
      phone: new FormGroup('', Validators.required),
    });

    if (this.customerId) {
      // get the customer info from the service
      this.customerService.getById(this.customerId).subscribe(
        data => {
          this.customer = data;
          this.form.patchValue(data);
        },
        error => {
          console.error('error:',error)
        }
      )
    }

  }

  onSubmit() {
    // validate the form
    if (this.form.valid) {
      this.customerService.put(this.customerId, this.form.value).subscribe(
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
