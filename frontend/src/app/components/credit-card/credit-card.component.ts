import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/http/auth.service';
import { CreditService } from 'src/app/http/credit.service';
import { CreditCard } from 'src/app/models/credit-card';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css'],
})
export class CreditCardComponent implements OnInit, OnChanges {
  // TODO: for adding credit
  creditToAdd?: number = 0;
  // ? deposit credit
  isUserAddingCredit = false;
  // ? localStorage
  userRole = localStorage.getItem('role');
  userId = localStorage.getItem('id');
  token = localStorage.getItem('token');
  // ? activation attributes
  isCreateFormActive = false;
  isUpdateFormActive = false;
  isUserHasCreditCard = false;
  // ? forms
  createCreditForm = new FormGroup({
    bank: new FormControl('', [Validators.required, Validators.minLength(4)]),
    balance: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.pattern('\d'),
    ]),
  });
  updateCreditForm = new FormGroup({
    bank: new FormControl('', [Validators.required, Validators.minLength(4)]),
    balance: new FormControl(0, [Validators.required, Validators.min(0)]),
  });
  // ? instances
  credit?: CreditCard;
  user?: User;
  // ? messages from api
  successMsg?: string = '';
  errorMsg?: string = '';
  noCreditCard?: string = '';
  constructor(
    private creditService$: CreditService,
    private formBuilder: FormBuilder,
    private userService$: AuthService
  ) {
    this.formBuilder.group(this.createCreditForm);
  }
  ngOnChanges(): void {
    console.log(this.creditToAdd);
  }
  // ngOnChanges(changes: SimpleChanges): void {

  //   console.log(this.creditToAdd)
  // }
  ngOnInit(): void {
    if (this.credit !== null) {
      this.getCreditCardController(this.userId + '');
    }
  }

  addDeposit(creditDeposit?: number) {
    localStorage.setItem('youssef', `${creditDeposit}`);
    let currentBalance = Number(this.credit?.balance);
    let addedBalance = Number(localStorage.getItem('youssef'));
    let sum: number = currentBalance + addedBalance;
    let credit: CreditCard = {
      _id: this.credit?._id,
      bank: this.credit?.bank,
      balance: sum,
    };
    this.creditService$.updateCreditService(`${credit._id}`, credit).subscribe({
      next: (n) => {
        this.successMsg = `${n}`;
        this.getCreditCardController(this.userId + '');
        this.isUserAddingCredit = false;
      },
      error: (e) => (this.errorMsg = e.error.msg),
      complete: () => console.info('[CREDIT] UPDATTING CREDIT => COMPLETED'),
    });
  }

  // ! should be completed

  showCreditUserController() {}
  // * CRUD OPERATIONS
  // TODO : SHOULD BE REVIEWED
  // ? CREATE CREDIT CARD
  createCreditCardController() {
    this.creditService$
      .createCreditService(this.createCreditForm.value)
      .subscribe({
        next: (n) => {
          this.successMsg = `${n}`;
          this.isUserHasCreditCard = false;
          this.isCreateFormActive = false;
          this.getCreditCardController(this.userId + '');
        },
        error: (e) => {
          this.errorMsg = e.error.msg;
          console.log(this.errorMsg);
        },
        complete: () => console.info('[CREDIT] CREATE CREDIT => COMPLETED !'),
      });
  }

  // ? FETCH CREDIT CARD BY ID
  getCreditCardController(id: string) {
    this.creditService$.getCreditByIdService(id).subscribe({
      next: (n) => (this.credit = n),
      error: (e) => (this.errorMsg = e.error.msg),
      complete: () => console.info('[CREDIT] FETCH BY ID => COMPLETED'),
    });
  }

  // ? UPDATE CREDIT CARD
  updateCreditCardController(id: string) {
    this.creditService$
      .updateCreditService(id, this.updateCreditForm.value)
      .subscribe({
        next: (n) => {
          this.successMsg = `${n}`;
          this.getCreditCardController(this.credit?._id + '');
          this.isUpdateFormActive = false;
        },
        error: (e) => (this.errorMsg = e.error.msg),
        complete: () => console.info('[CREDIT] PATCH CREDIT => COMPLETED !'),
      });
  }

  // ? DELETE CREDIT CARD
  deleteCreditCardController(id: string) {
    this.creditService$.deleteCreditService(id).subscribe({
      next: (n) => {
        this.successMsg = `${n}`;
        this.isUserHasCreditCard = false;
        this.credit = undefined;
      },
      error: (e) => {
        this.errorMsg = e.error.msg;
      },
      complete: () => console.info('[CREDIT] DELETE CREDIT => COMPLETED !'),
    });
  }

  createFormActivation() {
    this.isCreateFormActive = !this.isCreateFormActive;
  }
  updateFormActivation(id?: any) {
    this.fillUpdateCreditForm(id);

    this.isUpdateFormActive = !this.isUpdateFormActive;
  }

  fillUpdateCreditForm(id: string) {
    this.creditService$.getCreditByIdService(id).subscribe({
      next: (n) => {
        this.credit = n;
        this.updateCreditForm.patchValue({
          bank: this.credit.bank,
          balance: this.credit.balance,
        });
      },
      error: (e) => (this.errorMsg = e.error.msg),
      complete: () => console.info('[CREDIT] PATH => COMPLETED !'),
    });
  }

  activeDepositFN() {
    this.isUserAddingCredit = !this.isUserAddingCredit;
  }
  // ! add money to your account
  moneyDepositionController() {
    let credit = this.credit?.balance;

    this.creditService$.updateCreditService;
  }
}
