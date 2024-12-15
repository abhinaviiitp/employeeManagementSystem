import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeListComponent } from './employee-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, of } from 'rxjs';
import { EmployeeService } from 'src/app/employee.service';
import { UtilityService } from 'src/app/utility.service';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let mockEmployeeService: jasmine.SpyObj<EmployeeService>;
  let mockUtilityService: jasmine.SpyObj<UtilityService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockEmployeeService = jasmine.createSpyObj('EmployeeService', ['employees', 'deleteEmployee']);
    mockUtilityService = jasmine.createSpyObj('UtilityService', ['formatFilterValue', 'openConfirmDialog']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: UtilityService, useValue: mockUtilityService },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    mockEmployeeService.employees = new BehaviorSubject([
      {
        id: 1,
        name: 'John Doe',
        companyName: 'Tech Corp',
        emailId: 'john.doe@example.com',
        contactNo: '+1234567890',
        designation: 'Software Developer',
        avatar: 'https://api.dicebear.com/5.x/bottts/svg?seed=Avatar1'
      }
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load employee data on initialization', () => {
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].name).toBe('John Doe');
  });

  it('should apply filter correctly', () => {
    mockUtilityService.formatFilterValue.and.returnValue('john');
    const event = new InputEvent('input', { bubbles: true, cancelable: true });
    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('john');
  });

  it('should delete employee when confirmed', () => {
    mockUtilityService.openConfirmDialog.and.returnValue({ afterClosed: () => of(true) } as any);
    mockEmployeeService.deleteEmployee.and.callFake(() => {});

    component.confirmDelete(1);
    expect(mockEmployeeService.deleteEmployee).toHaveBeenCalledWith(1);
  });

  it('should not delete employee when not confirmed', () => {
    mockUtilityService.openConfirmDialog.and.returnValue({ afterClosed: () => of(false) } as any);

    component.confirmDelete(1);
    expect(mockEmployeeService.deleteEmployee).not.toHaveBeenCalled();
  });
});
