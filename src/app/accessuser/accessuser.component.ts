import { Router } from '@angular/router';
import { UserdataService } from './../userdata.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accessuser',
  templateUrl: './accessuser.component.html',
  styleUrls: ['./accessuser.component.css']
})
export class AccessuserComponent implements OnInit {

  constructor(private userdata:UserdataService,private router:Router) { }

  ngOnInit(): void {
    this.userdata.getUserProfile({}).subscribe(
      res=>{
        alert(res["reason"])
        this.router.navigateByUrl("/login")

      },
      err=>{
alert(err)
      }
    )
  }

}
