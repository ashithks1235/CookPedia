import { Component, inject } from '@angular/core';
import { Footer } from "../footer/footer";
import { ApiService } from '../services/api-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Footer,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  router = inject(Router)
  api = inject(ApiService)
  fb = inject(FormBuilder)
  loginForm:FormGroup

  constructor(){
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,
        Validators.pattern('[a-zA-Z0-9]*')]]
    })
  }

  login(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      this.api.loginAPI({email,password}).subscribe({
        next:((res:any)=>{
          sessionStorage.setItem("token",res.token)
          sessionStorage.setItem("user",JSON.stringify(res.user))
          this.loginForm.reset()
          alert("user login successfull")
          this.api.getChartData()
          if(res.user.role=="user"){
            this.router.navigateByUrl('/')
          }else{
            this.router.navigateByUrl('/admin')
          }
        }),
        error:((reason:any)=>{
          alert(reason.error)
        })
      })
    }else{
      alert("invalid form!!! please fill the form with valid data")
    }
  }

}
