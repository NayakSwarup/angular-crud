import { Component, OnInit } from '@angular/core';
import {Employee} from './employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees:Employee[];

  public employee = new Employee();
  constructor(private _employeeService:EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees():void{
    this._employeeService.getAllEmployee()
                        .subscribe((employeeData)=>{
                          this.employees=employeeData,
                          console.log(employeeData)},
                        (error)=>{
                              console.log(error);
                        });
  }

  addEmployee():void {
    console.log(this.employee);
    
    this._employeeService.addEmployee(this.employee)
                          .subscribe((response)=>{
                            this.getEmployees();
                          },
                          (error)=>{console.log(error);
                          })

  }
  deleteEmployee(id:number)
  {
    this._employeeService.deleteEmployee(id)
    .subscribe((response)=>{console.log(response),this.getEmployees();},(error)=>{console.log(error)})
  }

}
