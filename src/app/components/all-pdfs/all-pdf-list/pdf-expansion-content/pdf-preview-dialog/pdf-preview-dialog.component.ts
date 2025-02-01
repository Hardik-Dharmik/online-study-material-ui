import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseSingleton } from 'src/app/classes/Supabase';

@Component({
  selector: 'pdf-preview-dialog',
  templateUrl: './pdf-preview-dialog.component.html',
  styleUrl: './pdf-preview-dialog.component.scss'
})
export class PdfPreviewDialogComponent {
  fileURL: string = '';
  supabase: SupabaseClient;


  constructor(@Inject(MAT_DIALOG_DATA) public pdf: any) {
    this.fileURL = pdf.fileURL;
    this.supabase = SupabaseSingleton.getInstance();
  }

  ngOnInit() {
    this.getPDF();
  }

  async getPDF() {
    const { data, error } = await this.supabase
      .storage
      .from('pdfs')
      .createSignedUrl(this.fileURL, 60);

    this.fileURL = data?.signedUrl || ''

  }
}
