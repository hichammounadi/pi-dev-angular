import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/http/auth.service';
import { IdentityService } from 'src/app/http/identity.service';
import { Identity } from 'src/app/models/identity';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-identity-card',
  templateUrl: './identity-card.component.html',
  styleUrls: ['./identity-card.component.css'],
})
export class IdentityCardComponent implements OnInit {
  // ? fetching data from local storage
  userRole = localStorage.getItem('role');
  userId = localStorage.getItem('id');
  //? instances
  identity?: Identity;
  identities?: Identity[];
  // ? messages
  successMsg? = '';
  errorMsg? = '';
  // ? attribute
  generatedIdentity?: String = '';
  // ? forms settings vars
  isCreateFromActive = false;
  isUpdateFromActive = false;
  // ? forms
  createIdentityForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    father: new FormControl('', [Validators.required]),
    mother: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    occupation: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    birth: new FormControl('', [Validators.required]),
    identity: new FormControl(''),
    status: new FormControl(''),
  });
  updateIdentityForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    father: new FormControl('', [Validators.required]),
    mother: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    occupation: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    birth: new FormControl('', [Validators.required]),
    identity: new FormControl(''),
    status: new FormControl(''),
  });
  constructor(
    private identityService$: IdentityService,
    private formBuilder: FormBuilder,
    private userService$: AuthService
  ) {
    this.formBuilder.group(this.createIdentityForm);
  }

  ngOnInit(): void {
    if (this.userRole === 'CITIZEN') {
      this.getCitizenIdentityController();
    }
    if (this.userRole === 'ADMIN') {
      this.getCitizensIdentitiesController();
    }
  }

  getCitizenIdentityController(id?: any) {
    if (id) {
      this.identityService$.getIdentityByIdOrUserService(`${id}`).subscribe({
        next: (n) => (this.identity = n),
      });
    } else {
      this.identityService$
        .getIdentityByIdOrUserService(`${this.userId}`)
        .subscribe({
          next: (n) => (this.identity = n),
        });
    }
  }
  createCitizenIdentityController() {
    console.log(this.createIdentityForm.value);

    this.identityService$
      .createIdentityService(this.createIdentityForm.value)
      .subscribe({
        next: (n) => (this.successMsg = `${n}`),
        error: (e) => (this.errorMsg = e.error.msg),
        complete: () => console.info('[IDENTITY] Create => COMPLETED'),
      });
  }

  updateCitizenIdentityController() {
    this.identityService$
      .updateIdentityService(`${this.userId}`, this.updateIdentityForm.value)
      .subscribe({
        next: (n) => (this.successMsg = `${n}`),
        error: (e) => (this.errorMsg = e.error.msg),
        complete: () => console.info(`[IDENTITY] Update => COMPLETED`),
      });
  }

  getCitizensIdentitiesController() {
    this.identityService$.getIdentitiesService().subscribe({
      next: (n) => (this.identities = n),
      error: (e) => (this.errorMsg = e),
      complete: () =>
        console.info("[IDENTITY] Fetching citizens' identities => COMPLETED"),
    });
  }

  // ! update the identity
  // ? get the last eight carachters from the _id of the identity
  // * ADMIN = add identity and update the status
  adminUpdateController(id: String) {
    this.identityService$.getIdentityByIdOrUserService(id).subscribe({
      next: (n) => {
        let identity = n;
        this.updateIdentityForm.patchValue({
          firstName: identity.firstName,
          lastName: identity.lastName,
          father: identity.father,
          mother: identity.mother,
          address: identity.address,
          birth: identity.birth,
          occupation: identity.occupation,
          gender: identity.gender,
          status: identity.status,
          identity: (identity.identity = this.generateIdentity(identity._id)),
        });
      },
      error: (e) => (this.errorMsg = e.error.msg),
      complete: () => console.info('[UPDATE] identity => COMPLETED'),
    });
  }

  // ? Update citizen admin
  updateIdentityController(id: String) {
    this.identityService$
      .updateIdentityService(id, this.updateIdentityForm.value)
      .subscribe({
        next: (n) => {
          console.log(n);
          this.successMsg = `${n}`;
          if (this.userRole === 'ADMIN') {
            this.getCitizensIdentitiesController();
          }
        },
        error: (e) => (this.errorMsg = e.error.msg),
        complete: () => console.info('[IDENTITY] Update => COMPLETED'),
      });
  }

  // ? once the button click no longer clickable
  generateIdentity(id: any) {
    return (this.generatedIdentity = id.slice(id.length - 8, id.length));
  }

  createFormActivation() {
    this.isCreateFromActive = !this.isCreateFromActive;
  }
  updateFormActivation(id?: any) {
    console.log(id);
    if (id) {
      this.getCitizenIdentityController(id);
      this.adminUpdateController(id);
    }
    this.isUpdateFromActive = !this.isUpdateFromActive;
  }
}
