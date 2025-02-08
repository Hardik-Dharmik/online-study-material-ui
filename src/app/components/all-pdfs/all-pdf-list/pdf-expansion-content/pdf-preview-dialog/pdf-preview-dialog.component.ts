import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseSingleton } from 'src/app/classes/Supabase';
import { PDFDocument } from 'pdf-lib';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-pdf-preview-dialog',
  templateUrl: './pdf-preview-dialog.component.html',
  styleUrl: './pdf-preview-dialog.component.scss'
})
export class PdfPreviewDialogComponent implements OnInit {
  fileURL: any = '';
  supabase: SupabaseClient;
  zoom = '100%';

  spinner = inject(NgxSpinnerService);

  constructor(@Inject(MAT_DIALOG_DATA) public pdf: any, private sanitizer: DomSanitizer) {
    this.fileURL = pdf.fileURL;
    this.supabase = SupabaseSingleton.getInstance();
  }

  ngOnInit() {
    this.getPDF();
  }

  async getPDF() {
    this.spinner.show('pdf');
    const { data, error } = await this.supabase
      .storage
      .from('pdfs')
      .createSignedUrl(this.fileURL, 3600);

    this.fileURL = data?.signedUrl || '';
    this.spinner.hide('pdf');
  }
}
