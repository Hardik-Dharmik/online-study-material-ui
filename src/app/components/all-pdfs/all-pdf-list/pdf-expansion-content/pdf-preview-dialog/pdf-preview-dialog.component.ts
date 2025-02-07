import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseSingleton } from 'src/app/classes/Supabase';
import { PDFDocument } from 'pdf-lib';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-preview-dialog',
  templateUrl: './pdf-preview-dialog.component.html',
  styleUrl: './pdf-preview-dialog.component.scss'
})
export class PdfPreviewDialogComponent implements OnInit {
  fileURL: any = '';
  supabase: SupabaseClient;
  zoom = '100%';


  constructor(@Inject(MAT_DIALOG_DATA) public pdf: any, private sanitizer: DomSanitizer) {
    this.fileURL = pdf.fileURL;
    this.supabase = SupabaseSingleton.getInstance();
  }

  ngOnInit() {
    this.getPDF();
    // this.getFirstPagePDF();
  }

  async getPDF() {
    const { data, error } = await this.supabase
      .storage
      .from('pdfs')
      .createSignedUrl(this.fileURL, 3600);

    this.fileURL = data?.signedUrl || ''

  }

  // async getFirstPagePDF1() {
  //   const { data, error } = await this.supabase
  //     .storage
  //     .from('pdfs')
  //     .createSignedUrl(this.fileURL, 3600);

  //   if (error) {
  //     console.error('Error creating signed URL:', error);
  //     return;
  //   }

  //   const pdfUrl = data?.signedUrl || '';
  //   const pdfDoc = await PDFLib.PDFDocument.load(pdfUrl);
  //   const firstPage = await pdfDoc.copyPages(pdfDoc, [0]);
  //   const newPdfDoc = await PDFLib.PDFDocument.create();
  //   newPdfDoc.addPage(firstPage[0]);

  //   const pdfBytes = await newPdfDoc.save();
  //   const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  //   this.fileURL = URL.createObjectURL(blob);
  // }

  async getFirstPagePDF() {
    const { data, error } = await this.supabase
      .storage
      .from('pdfs')
      .createSignedUrl(this.fileURL, 3600);

    if (error) {
      console.error('Error creating signed URL:', error);
      return;
    }

    const pdfUrl = data?.signedUrl || '';

    try {
      // Fetch the PDF
      const arrayBuffer = await fetch(pdfUrl).then(res => res.arrayBuffer());

      // Load the original PDF
      const originalPdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      // Create a new PDF document
      const newPdfDoc = await PDFDocument.create();

      // Copy allowed pages (e.g., first 5 pages)
      const pagesToCopy = [0]; // Indices of pages to include
      const copiedPages = await newPdfDoc.copyPages(originalPdfDoc, pagesToCopy);
      console.log(copiedPages);
      // Add copied pages to the new document
      copiedPages.forEach(page => newPdfDoc.addPage(page));
      console.log("pages added");
      // Save the new PDF and create a Blob URL
      const pdfBytes = await newPdfDoc.save();
      console.log(pdfBytes, newPdfDoc);

      let bytes = new Uint8Array(pdfBytes.length);
      for (var i = 0; i < pdfBytes.length; i++) {
        bytes[i] = pdfBytes[i];
      }

      // const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });


      const blob = new Blob([bytes], { type: 'application/pdf' });
      console.log(blob);
      // console.log(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)));
      var file_object = new File([blob], "file_name.pdf", { type: 'application/pdf' });
      console.log(file_object);
      this.fileURL = URL.createObjectURL(file_object);

      console.log(this.fileURL);
    } catch (err) {
      console.error('Error processing PDF:', err);
    }
  }

  // Restrict to 5 pages
  onPagesLoaded(pages: any) {
    console.log(pages);
    const MAX_PAGES = 1;
    if (pages.length > MAX_PAGES) {
      pages.splice(MAX_PAGES); // Remove pages beyond the limit
    }
  }
}
