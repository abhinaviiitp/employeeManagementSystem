import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from './types';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
public employees = new BehaviorSubject<Employee[]>([{
    id: 1,
    name: 'John Doe',
    companyName: 'Tech Corp',
    emailId: 'john.doe@example.com',
    contactNo: '+1234567890',
    designation: 'Software Developer',
    avatar: 'https://api.dicebear.com/5.x/bottts/svg?seed=Avatar1'
  }]);

  employees$ = this.employees.asObservable();

  addEmployee(employee: Employee) {
    const currentEmployees = this.employees.getValue();
    this.employees.next([...currentEmployees, employee]);
  }

  updateEmployee(updatedEmployee: Employee) {
    const currentEmployees = this.employees.getValue().map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    this.employees.next(currentEmployees);
  }

  deleteEmployee(id: number) {
    const currentEmployees = this.employees.getValue().filter(emp => emp.id !== id);
    this.employees.next(currentEmployees);
  }
}
