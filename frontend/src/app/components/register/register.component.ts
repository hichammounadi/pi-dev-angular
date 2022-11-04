import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/http/auth.service';
import { RegisterUser } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUser?: RegisterUser;
  successMsg?:String = '';
  errorMsg = '';
  constructor(private authService$: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.formBuilder.group(this.registerForm)
  }
  registerForm = new FormGroup({
    fullname: new FormControl('', [Validators.required, ]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  ngOnInit(): void {
  }

  registerUserController() {
    this.authService$.registerUserService(this.registerForm.value).subscribe({
      next: n => this.successMsg = n,
      error: e => this.errorMsg = e.error.msg,
      complete: () => console.info('REGISTER => COMPLETED !')
    })
  }
}
