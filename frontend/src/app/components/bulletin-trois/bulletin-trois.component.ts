import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/http/auth.service';
import { BulletinService } from 'src/app/http/bulletin.service';
import { IdentityService } from 'src/app/http/identity.service';
import { Bulletin } from 'src/app/models/bulletin';
import { Identity } from 'src/app/models/identity';

@Component({
  selector: 'app-bulletin-trois',
  templateUrl: './bulletin-trois.component.html',
  styleUrls: ['./bulletin-trois.component.css'],
})
export class BulletinTroisComponent implements OnInit {
  // ? msg
  successMsg = '';
  errorMsg = '';

  // ? localstorage items
  userRole = localStorage.getItem('role');
  userId = localStorage.getItem('id');

  // ? instances
  bulletin?: Bulletin;
  bulletins?: Bulletin[];
  identity? : Identity;

  // ? activation atributes

  isCreateFormActive = false;
  isUpdateFromActive = false;
  doesCitizenHasIdentity = false;


  // ? create and update forms
  createBulltinForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    father: new FormControl('', [Validators.required]),
    mother: new FormControl('', [Validators.required]),
    identity: new FormControl('', [Validators.required]),
    occupation: new FormControl('', [Validators.required]),
    birth: new FormControl('', [Validators.required])
  });
  updateBulltinForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    fatherName: new FormControl('', [Validators.required]),
    motherName: new FormControl('', [Validators.required]),
    identity: new FormControl('', [Validators.required]),
  });

  constructor(
    private bulletinService$: BulletinService,
    private formBuilder: FormBuilder,
    private userService$: AuthService,
    private identityService$: IdentityService
  ) {
    this.formBuilder.group(this.createBulltinForm);
  }

  ngOnInit(): void {
    if (this.userRole === 'CITIZEN') {
      this.getBulletinCitizenController();
      this.getCitizenIdentity();
    } else {
      this.getBulletinsController();
    }
  }
  getBulletinCitizenController() {
    this.bulletinService$.getBulletinByIdService(`${this.userId}`).subscribe({
      next: (n) => (this.bulletin = n),
      error: (e) => (this.errorMsg = e.error.msg),
      complete: () => console.info('[B-3] FETCH CITIZEN BULLETIN => COMPLETE'),
    });
  }

  // ! get citizen information
  getCitizenInfoController() {
    this.identityService$
      .getIdentityByIdOrUserService(`${this.userId}`)
      .subscribe({
        next: (n) => {
          
          this.identity = n
          console.log(this.bulletin)
          this.createBulltinForm.patchValue({
            firstName: this.identity?.firstName,
            lastName: this.identity?.lastName,
            father: this.identity?.father,
            mother: this.identity?.mother,
            identity: this.identity?.identity,
            birth: this.identity?.birth,
            occupation: this.identity?.occupation
          });
        },
        error: (e) => {
          console.log(`there was an error ${e}`);
        },
        complete: () => console.info('[B-3] GET CITIZEN INFO'),
      });
  }
  // ! CREATE IS ALREADY CREATED BACKEND
  createBulletinTroisController() {
    this.bulletinService$
      .createBulletinService(this.createBulltinForm.value)
      .subscribe({
        next: (n) => (this.successMsg = `${n}`),
        error: (e) => (this.errorMsg = e.error.msg),
        complete: () => {
          console.info('[B-3] CREATE => COMPLETE');
          this.getBulletinCitizenController();
          this.isCreateFormActive = false;
        },
      });
  }
  updateBulletinTroisController(id:string, status:string) {
    this.bulletinService$
      .updateBulletinService(`${id}`, 'ACTIVATED')
      .subscribe({
        next: (n) => {
          this.successMsg = `${n}`;
        },
        error: (e) => (this.errorMsg = e.error.msg),
        complete: () => {
          console.info('[B-3] PATCH => COMPLETE');
          this.getBulletinsController()
        },
      });
  }
  getBulletinsController() {
    this.bulletinService$.getBulletinsService().subscribe({
      next: (n) => (this.bulletins = n),
      error: (e) => (this.errorMsg = e.error.msg),
      complete: () => console.info('[B-3] FETCH ALL B-3 => COMPLETE'),
    });
  }
  createFormActivation() {
    console.log('hello ====> ', this.identity)
    //  const t = this.getCitizenInfoController()
    // console.log('value of t ' , t)
    if(this.identity?.status !== 'ACTIVATED'){
      this.errorMsg = `The status of your identity is ${this.identity?.status}, you can not proceed`
      return;
    }
    if (this.userRole === 'CITIZEN') {
      this.getCitizenInfoController();
    }
    this.isCreateFormActive = !this.isCreateFormActive;
  }

  getCitizenIdentity() {
    this.identityService$
      .getIdentityByIdOrUserService(`${this.userId}`)
      .subscribe({
        next: (n) => {
          this.identity = n
          if (this.identity.status === 'ACTIVATED') {
            this.doesCitizenHasIdentity = true;
          }
          this.doesCitizenHasIdentity = false;
        },
        error: (e) => (this.errorMsg = e.error.msg),
        complete: () => console.info('[CIN] FETCH identity => COMPLETE'),
      });
  }
}
