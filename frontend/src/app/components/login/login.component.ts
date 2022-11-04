import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/http/auth.service';
import { LoginUser, TokenUser } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService$: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.formBuilder.group(this.loginForm);
  }
  successMsg = '';
  errorMsg = '';
  token?: any;
  loginUser?: LoginUser;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.required])
  })


  ngOnInit(): void {
  }
  loginUserController() {
    this.authService$.loginUserService(this.loginForm.value).subscribe({
      next: n => {
        this.token = n;
        localStorage.setItem('role', `${this.token["tokenUser"].userRole}`)
        localStorage.setItem('id', `${this.token["tokenUser"].userId}`)
        localStorage.setItem('token', `${this.token["refreshToken"]}`)
        this.router.navigate(['dashboard'])
      },
      error: e => this.errorMsg = e.error.msg,
      complete: () => console.info('LOGIN => COMPLETED !')
    })
  }

}
