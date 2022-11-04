import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/http/auth.service';
import { BulletinService } from 'src/app/http/bulletin.service';
import { IdentityService } from 'src/app/http/identity.service';
import { Bulletin } from 'src/app/models/bulletin';

@Component({
  selector: 'app-bulletin-trois',
  templateUrl: './bulletin-trois.component.html',
  styleUrls: ['./bulletin-trois.component.css']
})
export class BulletinTroisComponent implements OnInit {

  // ? localstorage items
  userRole = localStorage.getItem('role')
  userId = localStorage.getItem('id')

  // ? instances
  bulletin?: Bulletin;
  bulletins?: Bulletin[];

  // ? activation atributes

  isCreateFormActive = false;
  isUpdateFromActive = false;

  // ? create and update forms
  createBulltinForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    user: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    fatherName: new FormControl('', [Validators.required]),
    motherName: new FormControl('', [Validators.required]),
    identity: new FormControl('', [Validators.required]),
  })

  constructor(private bulletinService$: BulletinService,private formBuilder: FormBuilder,private userService$: AuthService,private identityService$: IdentityService) {
    this.formBuilder.group(this.createBulltinForm)
   }

  ngOnInit(): void {
  }

}
