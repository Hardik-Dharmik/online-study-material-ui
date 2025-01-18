import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [
        ButtonModule, FileUploadModule
    ],
})
export class PrimeNGModule { }