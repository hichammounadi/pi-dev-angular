import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/http/auth.service';
import { InvoiceService } from 'src/app/http/invoice.service';
import { Invoice } from 'src/app/models/invoice';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  // ? forms
  activeCreateForm = false;
  activeUpdateForm = false;
  // ? messages
  successMsg?: String = '';
  errorMsg?: String = '';
  // ? instances
  users?: User[];
  invoices!: Invoice[];
  invoice!: Invoice;
  // ? user role => local storage
  userRole?: String = `${localStorage.getItem('userRole')}`
  constructor(private userService$: AuthService, private invoiceService$: InvoiceService, private router: Router, private formBuilder: FormBuilder) {
    this.formBuilder.group(this.invoiceCreateForm)
  }
  // * CREATE FORM
  invoiceCreateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    user: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required])

  })

  // * UPDATE FORM 
  invoiceUpdateFrom = new FormGroup({})

  ngOnInit(): void {
  }

  // * Create invoice controller
  createInvoiceController(){
    this.invoiceService$.createInvoiceService(this.invoiceCreateForm.value).subscribe({
      next: n => this.successMsg = n,
      error: e => this.errorMsg = e.error.msg,
      complete: () => console.info('[INVOICE] : Creation => COMPLETED !')
    })
  }

  // * Get all invoices controller
  getInvoicesController() {
    this.invoiceService$.getInvoicesService().subscribe({
      next: n => this.invoices = n,
      error: e => this.errorMsg = e.error.msg,
      complete: () => console.info('[INVOICE] : Get All Invoices => COMPLETD !')
    })
  }

  // * Get invoice by Id controller
  getInvoiceByIdController(id:String) {
    this.invoiceService$.getInvoiceByIdService(id).subscribe({
      next: n => this.invoice = n,
      error: e => this.errorMsg = e.error.msg,
      complete: () => console.info(
        ' [INVOICE] GET BY ID => COMPLETED ! '
      )
    })
  }

  // * Update invoice controller
  updateInvoiceController(id: String){
    this.invoiceService$.updateInvoiceService(id, this.invoiceUpdateFrom.value).subscribe({
      next: n => this.successMsg = n,
      error: e => this.errorMsg = e.error.msg,
      complete: () => console.info('[INVOICE] Update => COMPLETED !')
    })
  }
  
  // * Delete invoice controller
  deleteInvoiceController(id:String){
    this.invoiceService$.deleteInvoiceService(id).subscribe({
      next: n => this.successMsg = n,
      error: e => this.errorMsg = e.error.msg,
      complete: () => console.info('[INVOICE] Delete => COMPLETED !')
    })
  }


  // ! adding function for hiding update and create form
  // ! depending on the role of the user

  getUsers(){
    this.userService$.getUsersService().subscribe({
      next: n => this.users = n,
      error: e => this.errorMsg = e.error.msg,
      complete: () => console.info('[INVOICE] GET Users => Completed !')
    })
  }
  // * Activate a
  isCreateFormActive(){
    this.getUsers();
    this.activeCreateForm = !this.activeCreateForm
  }
  isUpdateFormActive(){
    this.getUsers();
    this.activeUpdateForm = !this.activeUpdateForm
  }
  
}
