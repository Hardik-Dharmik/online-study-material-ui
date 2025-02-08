import { Component, inject, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseSingleton } from 'src/app/classes/Supabase';
import { PdfPreviewDialogComponent } from '../all-pdf-list/pdf-expansion-content/pdf-preview-dialog/pdf-preview-dialog.component';
import { PdfService } from 'src/app/services/pdfs/pdf.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-all-pdf-table',
  templateUrl: './all-pdf-table.component.html',
  styleUrl: './all-pdf-table.component.scss'
})
export class AllPdfTableComponent implements OnInit {
  @Input() allPdfs: any[] = [];

  supabase: SupabaseClient;
  displayedColumns: string[] = ['serialNumber', 'filename', 'standard', 'subject', 'type', 'actions'];
  dataSource = new MatTableDataSource<any>(this.allPdfs);

  dialog = inject(MatDialog);
  pdfService = inject(PdfService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
  ) {
    this.supabase = SupabaseSingleton.getInstance();
  }

  ngOnInit() {
    this.addSerialNumberToPdfList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['allPdfs']) {
      this.addSerialNumberToPdfList();
    }
  }

  addSerialNumberToPdfList() {
    this.dataSource.data = this.pdfService.addSerialNumberToPdfList(this.allPdfs);
  }

  applyFilter(event: any) {
    let filterValue = event?.value
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  previewPdf(pdf: any) {
    const dialogRef = this.dialog.open(PdfPreviewDialogComponent, { data: pdf, minWidth: '350px', width: '80%' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
