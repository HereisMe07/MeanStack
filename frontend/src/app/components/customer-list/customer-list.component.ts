import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CustomerService } from '../../services/customer.service.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit{

  // inject the customer service 
  private customerService = inject(CustomerService);
  // customer list
  customers!: Customer[];
  
  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.customerService.get().subscribe(
      data => {
        console.log('customers', data);
        this.customers = data;
      },
      error => {
        console.error('error:', error);
      }
    );
  }

  onDeleteClick(customer: Customer) {
    if (window.confirm("Are you sure you want to delete this customer:" + customer.name + "?")) {
      this.customerService.delete(customer._id).subscribe(
        data => {
          this.initData();
        },
        error => {
          console.error('error:', error)
        }
      )
    }
  }

}
