import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {ServiceService} from '../service.service';
import {Userloginfo} from '../userloginfo';
import { ActivatedRoute, Router,Params } from "@angular/router";  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  datasaved = false;
  message: any;
  status:any;
  selectedlistId:any;
  tasks:any;
  listId:any;
  constructor(private fB: FormBuilder, private aS: ServiceService,private rT:Router,private route:ActivatedRoute ) {
    if(localStorage.getItem('Loginuser')){
      rT.navigate(['/']);
    }
   }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        if(params.listId){
          this.selectedlistId=params.listId;
          this.aS.getAllTasks(params.listId).subscribe((tasks: any) => {
            this.tasks = tasks;
          });
        }
        else{
          this.selectedlistId = undefined;
        }
        
      }
    )
    this.setFormState();
  }
  setFormState(): void {
    this.loginForm = this.fB.group({
      email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.maxLength(20)]]
    })
  }
 
  onSubmit() {
    
    let userinfo = this.loginForm.value;
    this.userLogin(userinfo);
    this.loginForm.reset();
    
  }
  userLogin(logininfo:Userloginfo) {
    this.aS.userlogin(logininfo).subscribe(
      (resResult:any) => {
       let resp=JSON.stringify(resResult);
       console.log(resp);
        this.datasaved = true;
        this.message = resResult['msg'];
        this.status = resResult['status'];
        if(resResult['status']=='success'){
        localStorage.setItem('Loginuser',resp);
        }else{
          localStorage.removeItem('Loginuser');
        }
       this.loginForm.reset();
       window.location.reload();
      }
    )
  }
 
}
