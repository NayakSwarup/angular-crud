import { Injectable } from '@angular/core';
import {Http ,Response,RequestOptions,Headers} from '@angular/http';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Employee} from "./employee/employee";
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/Rx';
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private  _httpService:Http) { }
  
  private handleError(error:Response)
  {
    return Observable.throw(error);
  }

  getAllEmployee(): Observable<Employee[]>
  {
    return this._httpService.get("http://localhost:8585/employee/all")
    .pipe(map((response :Response)=> response.json()))
    .pipe(catchError((this.handleError)));
    
    // map((response :Response)=> response.json())
    //.catch(this.handleError);
  }
  
  addEmployee(employee:Employee)
  {
    let body=JSON.stringify(employee);
    let headers= new Headers({'Content-Type':"application/json"});
    let options = new RequestOptions({headers:headers});
    return this._httpService.post("http://localhost:8585/employee/add",body,options)
  }

  deleteEmployee(id:number)
  {
   return  this._httpService.delete("http://localhost:8585/employee/delete/"+id)
  }
}
