import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulletinTroisComponent } from './components/bulletin-trois/bulletin-trois.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IdentityCardComponent } from './components/identity-card/identity-card.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register',  component: RegisterComponent},
  {path: 'dashboard', canActivate:[AuthGuard], component: DashboardComponent},
  {path: 'identity', component: IdentityCardComponent},
  {path: 'bulletin-trois', component: BulletinTroisComponent},
  {path: 'credit-card', component: CreditCardComponent},
  {path: 'invoice', component: InvoiceComponent},
  {path: '**', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
