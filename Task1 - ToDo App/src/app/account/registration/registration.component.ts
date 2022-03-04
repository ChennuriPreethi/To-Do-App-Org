import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {ServiceService} from '../service.service';
import {Accinfo} from '../accinfo';
import { Router } from "@angular/router"; 

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  regForm: any;
  datasaved = false;
  message: any;
  status:any;
  constructor(private fB: FormBuilder, private aS:ServiceService,private rT:Router) {
    if(localStorage.getItem('Loginuser')){
      rT.navigate(['/']);
    }
   }
 
  ngOnInit() {
    this.setFormState();
  }
  setFormState(): void {
    this.regForm = this.fB.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.maxLength(20)]]
    })
  }
 
  onSubmit() {
    
    let userinfo = this.regForm.value;
    this.createuserAccount(userinfo);
    this.regForm.reset();
  }
  createuserAccount(accinfo:Accinfo) {
    this.aS.createaccount(accinfo).subscribe(
      (resResult:any) => {
        let resp=JSON.stringify(resResult);
       console.log(resp);
        this.datasaved = true;
        this.message = resResult['msg'];
        this.status = resResult['status'];
       this.regForm.reset();
      }
    )
  }
}
