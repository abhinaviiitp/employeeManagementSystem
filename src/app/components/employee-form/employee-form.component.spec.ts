import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeFormComponent } from './employee-form.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { EmployeeService } from 'src/app/employee.service';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let mockEmployeeService: jasmine.SpyObj<EmployeeService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockEmployeeService = jasmine.createSpyObj('EmployeeService', ['addEmployee', 'updateEmployee']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [EmployeeFormComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatButtonModule,
        RouterTestingModule
      ],
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on creation', () => {
    expect(component.employeeForm).toBeDefined();
    expect(component.employeeForm.valid).toBeFalsy();
  });

  it('should add new employee on submit', () => {
    component.employeeForm.setValue({
      name: 'John Doe',
      companyName: 'Tech Corp',
      emailId: 'john@example.com',
      contactNo: '1234567890',
      designation: 'Software Developer',
      avatar: 'avatar1.png',
    });

    mockEmployeeService.addEmployee.and.callFake(() => {});
    component.onSubmit();

    expect(mockEmployeeService.addEmployee).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should update employee on submit in edit mode', () => {
    component.isEditMode = true;
    component.employeeId = 1;
    component.employeeForm.setValue({
      name: 'Jane Doe',
      companyName: 'Tech Solutions',
      emailId: 'jane@example.com',
      contactNo: '9876543210',
      designation: 'Manager',
      avatar: 'avatar2.png',
    });

    mockEmployeeService.updateEmployee.and.callFake(() => {});
    component.onSubmit();

    expect(mockEmployeeService.updateEmployee).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
