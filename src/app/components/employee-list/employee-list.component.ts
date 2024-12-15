import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/employee.service';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { UtilityService } from 'src/app/utility.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  displayedColumns: string[] = ['name', 'emailId', 'company', 'actions'];
  dataSource = new MatTableDataSource(this.employeeService.employees.getValue());

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.loadEmployeeData();
  }

  loadEmployeeData(): void {
    this.dataSource.data = this.employeeService.employees.getValue();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = this.utilityService.formatFilterValue(event);
    this.dataSource.filter = filterValue;
  }

  confirmDelete(id: number): void {
    this.utilityService.openConfirmDialog(this.dialog).afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.deleteEmployee(id);
        this.utilityService.openSnackBar('Employee deleted successfully.');
        this.loadEmployeeData();
      }
    });
  }
}
