import { Router } from '@angular/router';
import { UserdataService } from './../userdata.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  uname:any;
  umail:any;

  constructor(private userdata:UserdataService,private router:Router) { }

  ngOnInit(): void {
    this.userdata.getUserProfile(localStorage.getItem("username")).subscribe(
      res=>{
        if(res["message"]=="failed"){
          alert(res["reason"])
          this.router.navigateByUrl("/login")

        }
        else{
        this.uname=res.username
        this.umail=res.email}
      },err=>{
        alert(err)
      }

    )

  }

}
