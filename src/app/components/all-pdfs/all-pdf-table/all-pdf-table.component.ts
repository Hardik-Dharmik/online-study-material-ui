import { Component, OnInit } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseSingleton } from 'src/app/classes/Supabase';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-all-pdf-table',
  templateUrl: './all-pdf-table.component.html',
  styleUrl: './all-pdf-table.component.scss'
})
export class AllPdfTableComponent implements OnInit {
  supabase: SupabaseClient;
  displayedColumns: string[] = ['serialNumber', 'filename', 'standard', 'subject', 'type'];
  dataSource = [];
  allPdfs: any = [];

  constructor(
  ) {
    this.supabase = SupabaseSingleton.getInstance();
  }

  ngOnInit() {
    this.getAllPdfs();
  }

  async getAllPdfs() {
    const response = await this.supabase.from("pdfs").select("*");
    console.log(response);
    this.allPdfs = response?.data;
    let serialNumber = 0;
    this.dataSource = this.allPdfs.map((pdf: any) => {
      serialNumber++;
      return {
        serialNumber,
        ...pdf,
      };
    });
  }
}
