import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseSingleton } from 'src/app/classes/Supabase';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-all-pdfs',
  templateUrl: './all-pdfs.component.html',
  styleUrls: ['./all-pdfs.component.scss'],
})
export class AllPdfsComponent implements OnInit {
  mobileQuery: MediaQueryList;
  supabase: SupabaseClient;
  displayedColumns: string[] = ['serialNumber', 'filename', 'standard', 'subject', 'type'];
  dataSource = ELEMENT_DATA;
  allPdfs: any = [];

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
    const response = await this.supabase.from("pdfs").select("*");
    console.log(response);
    this.allPdfs = response?.data;
    let serialNumber = 0;
    this.allPdfs = this.allPdfs.map((pdf: any) => {
      serialNumber++;
      return {
        serialNumber,
        ...pdf,
      };
    });
    this.dataSource = this.allPdfs;

    console.log(this.allPdfs);
  }

}
