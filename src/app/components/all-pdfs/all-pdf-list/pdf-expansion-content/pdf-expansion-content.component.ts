import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PdfPreviewDialogComponent } from './pdf-preview-dialog/pdf-preview-dialog.component';


@Component({
  selector: 'pdf-expansion-content',
  templateUrl: './pdf-expansion-content.component.html',
  styleUrl: './pdf-expansion-content.component.scss'
})
export class PdfExpansionContentComponent {
  @Input() pdf: any;

  constructor(public dialog: MatDialog) { }


  previewPdf() {
    const dialogRef = this.dialog.open(PdfPreviewDialogComponent, { data: this.pdf, minWidth: '350px' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
