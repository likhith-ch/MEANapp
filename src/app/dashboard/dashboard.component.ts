import { Router,Params,ActivatedRoute, RouteReuseStrategy} from '@angular/router';
import { UserdataService } from './../userdata.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private users:UserdataService,private route:Router,private router: ActivatedRoute) { }
  usernamelocal:any=localStorage.getItem("username")

  ngOnInit(): void {
  }
 /* onClickSubmit(data:any){
    let username=this.router.snapshot.params.username
    if(data.password!=data.password1){
      alert("Passwords are not matching")
      this.route.navigateByUrl("/dashboard/"+username)
    }
    else{
    data.username=username
    delete data.password1;
    this.users.updateUserData(data).subscribe(res=>{
      if(res["message"]=="user Successfully Updated"){
        alert("User updated successful")
        this.route.navigateByUrl("/login")
      }
      else{alert("there is an error updating users")}
    })}
    

  }*/
  /*deleteAccount(){
    let username=this.router.snapshot.params.username
    this.users.deleteUserData(username).subscribe(res=>{if(res["message"]=="user deleted successfully"){this.route.navigateByUrl("/register")}
  })
  }*/
  logout(){
    localStorage.clear()
    this.route.navigateByUrl("/home")
  }
}
