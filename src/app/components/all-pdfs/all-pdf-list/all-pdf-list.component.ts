import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-all-pdf-list',
  templateUrl: './all-pdf-list.component.html',
  styleUrl: './all-pdf-list.component.scss'
})
export class AllPdfListComponent {
  @Input() allPdfs: any;
  panelOpenState = false;

  pdfs: any[] = [];

  ngOnInit() {
    this.pdfs = this.allPdfs;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['allPdfs']) {
      this.pdfs = this.allPdfs;
    }
  }

  applyFilter(event: any) {
    let searchTerm = event?.value
    if (!searchTerm) {
      return this.allPdfs;
    }
    this.pdfs = this.allPdfs.filter((pdf: any) => {
      return pdf.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pdf.standard.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pdf.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pdf.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pdf.description.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
}
