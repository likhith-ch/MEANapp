import { Router } from '@angular/router';
import { UserdataService } from './../userdata.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userdata:UserdataService,private router: Router) { }

  ngOnInit(): void {
    localStorage.clear()
  }
   
  onClickSubmit(data:any){
    if(data["usertype"]=="user"){
    this.userdata.getUserData(data).subscribe(
      res=>{
        if(res.message=="invalid username"){alert("invalid username")}
        else if(res["message"]=="login success"){
          localStorage.setItem("token",res["token"])
          localStorage.setItem("username",res["username"])
          this.router.navigateByUrl("/dashboard");
        }
        else{alert("invalid password")}

      },
      err=>{alert("something went wrong")
    console.log("error");
    this.router.navigateByUrl("/login")}
    )}
    if(data["usertype"]=="admin"){
      this.userdata.getAdminData(data).subscribe(
        res=>{
          if(res=="invalid username"){alert("invalid username")}
          else if(res){
            this.router.navigateByUrl("/dashboard/"+data["username"]);
          }
          else{alert("invalid password")}
  
        },
        err=>{alert("something went wrong")
      console.log("error");
      this.router.navigateByUrl("/login")}
      )}
   }

  }
