import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import 'rxjs';
import 'rxjs-compat';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { map} from 'rxjs/operators';
import {Employee} from'./employee.model'
 
@Injectable()
export class EmployeeService {
  selectedEmployee : Employee;
  employeeList : Employee[];
  constructor(private http : Http) { }
 
  postEmployee(emp : Employee){
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post('https://localhost:44376/api/Employees',body,requestOptions).pipe(map((response: any) => response.json()));
  }
 
  putEmployee(id, emp) {
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('https://localhost:44376/api/Employees/' + id,body,requestOptions).pipe(map((response: any) => response.json()));
  }
 
  getEmployeeList(){
    this.http.get('https://localhost:44376/api/Employees')
    .pipe(map((data : Response) =>{
      return data.json() as Employee[];
    })).toPromise().then(x => {
      this.employeeList = x;
    })
  }
 
  deleteEmployee(id: number) {
    return this.http.delete('https://localhost:44376/api/Employees/' + id).pipe(map((response: any) => response.json()));
  }
}