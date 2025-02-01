import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-all-pdf-list',
  templateUrl: './all-pdf-list.component.html',
  styleUrl: './all-pdf-list.component.scss'
})
export class AllPdfListComponent {
  @Input() allPdfs: any = [];
  panelOpenState = false;

}
