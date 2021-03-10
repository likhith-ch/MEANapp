import { Router} from '@angular/router';
import { UserdataService } from './../userdata.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userservice:UserdataService,private router:Router) { }

  ngOnInit(): void {
  }
  onClickSubmit(data:any){
    this.userservice.saveUserData(data).subscribe(
      res=>{
        if(res["message"]=="user successfully created"){
          alert("user created Sucessfully")
          this.router.navigateByUrl("/login")
        }
        else{
          alert("username already exists please try another")
        }

      },
      err=>{alert("something went wrong")
    console.log("error")}
    )
   }
}
