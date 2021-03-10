import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private hc:HttpClient) { }
  saveUserData(userdata:any):Observable<any>
  {
    return this.hc.post("/user/createuserasync",userdata)
  }
  getUserData(userdata:any):Observable<any>
  {
    return this.hc.post("/user/checkpasswordasync",userdata)
  }
  getAdminData(userdata:any):Observable<any>{
    return this.hc.post("/admin/checkpasswordasync",userdata)
  }
  updateUserData(userdata:any):Observable<any>
  {
    return this.hc.put("/user/updateuser/"+userdata["username"],userdata)
  }
  deleteUserData(username:any):Observable<any>
  {
    return this.hc.delete("/user/deleteuser/"+username)
  }
  getUserProfile(userdata:any):Observable<any>
  {
    return this.hc.get("/user/getuserasync/"+userdata)
  }
  
}

