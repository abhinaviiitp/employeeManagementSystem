// Utility Service for Reusable Methods
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private snackBar: MatSnackBar,){}

  // Format filter input for search functionality
  formatFilterValue(event: Event): string {
    if (event instanceof InputEvent) {
      const input = event.target as HTMLInputElement;
      return input?.value.trim().toLowerCase() || '';
    }
    return '';
  }

  // Open confirmation dialog for deletion
  openConfirmDialog(dialog: MatDialog) {
    return dialog.open(ConfirmDeleteDialogComponent, {
      width: '30%'
    });
  }

  // Open Snack Bar
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

}
