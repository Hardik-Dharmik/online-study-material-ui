import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  addSerialNumberToPdfList(allPdfs: any[]): any[] {
    let serialNumber = 0;
    return allPdfs.map((pdf: any) => {
      serialNumber++;
      return {
        serialNumber,
        ...pdf,
      };
    });
  }
}
