import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/types';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {
  employeeForm!: FormGroup;
  isEditMode = false;
  employeeId!: number;
  designations = ['Software Developer', 'Senior Developer', 'Team Lead', 'Manager'];
  avatars = [
    'https://api.dicebear.com/5.x/bottts/svg?seed=Avatar1',
    'https://api.dicebear.com/5.x/bottts/svg?seed=Avatar2',
    'https://api.dicebear.com/5.x/bottts/svg?seed=Avatar3',
    'https://api.dicebear.com/5.x/bottts/svg?seed=Avatar4',
    'https://api.dicebear.com/5.x/bottts/svg?seed=Avatar5',
  ];  

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      contactNo: ['', Validators.required],
      designation: ['', Validators.required],
      avatar: [this.avatars[0], Validators.required]
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.employeeId = +id;
        this.loadEmployeeDetails();
      }
    });
  }

  loadEmployeeDetails(): void {
    const employee = this.employeeService.employees.getValue().find((emp) => emp.id === this.employeeId);
    if (employee) {
      this.employeeForm.patchValue(employee);
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      const updatedEmployee: Employee = { id: this.employeeId, ...this.employeeForm.value };
      this.employeeService.updateEmployee(updatedEmployee);
    } else {
      const newEmployee: Employee = { id: Date.now(), ...this.employeeForm.value };
      this.employeeService.addEmployee(newEmployee);
    }
    this.router.navigate(['/']);
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
