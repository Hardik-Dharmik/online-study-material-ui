import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseSingleton } from 'src/app/classes/Supabase';
import { NgxSpinnerService } from "ngx-spinner";
import { PdfService } from 'src/app/services/pdfs/pdf.service';

@Component({
  selector: 'app-all-pdfs',
  templateUrl: './all-pdfs.component.html',
  styleUrls: ['./all-pdfs.component.scss'],
})
export class AllPdfsComponent implements OnInit {
  mobileQuery: MediaQueryList;
  supabase: SupabaseClient;
  displayedColumns: string[] = ['serialNumber', 'filename', 'standard', 'subject', 'type'];
  dataSource = [];
  allPdfs: any = [];

  spinner = inject(NgxSpinnerService);
  pdfService = inject(PdfService);

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
  ) {
    this.supabase = SupabaseSingleton.getInstance();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.getAllPdfs();
  }

  async getAllPdfs() {
    this.spinner.show('full');
    const response = await this.supabase.from("pdfs").select("*");
    this.allPdfs = this.pdfService.addSerialNumberToPdfList(response?.data || []);
    this.spinner.hide("full");
  }

}
