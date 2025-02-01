import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseSingleton } from 'src/app/classes/Supabase';
import { fileTypes } from 'src/app/constants/FileTypes.constant';
import { StandardOptions } from 'src/app/constants/Standard.constant';
import { Subjects } from 'src/app/constants/Subjects.constant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { uniqueFileNameValidator } from 'src/app/forms/validators/uniqueFileName.validator';

@Component({
  selector: 'app-pdf-form',
  templateUrl: './pdf-form.component.html',
  styleUrl: './pdf-form.component.scss'
})
export class PdfFormComponent implements OnInit {
  supabase: SupabaseClient;
  fileName = '';
  file: any = null;

  fileTypeOptions = fileTypes;
  standardOptions = StandardOptions;
  subjects: any = Subjects;
  subjectOptions: any = [{ id: 0, text: "Select standard", value: "standard" }];

  alreadyExistingFileName: any = [];

  errorMessages: any = {
    "filename": "Filename is required",
    "type": "Type is required",
    "standard": "Standard is required",
    "subject": "Subject is required",
    "description": "Description is required",
  };

  pdfForm!: UntypedFormGroup;

  constructor(
    private _snackBar: MatSnackBar
  ) {
    this.supabase = SupabaseSingleton.getInstance();
  }

  ngOnInit() {
    this.getAlreadyExistingFileName();

    this.pdfForm = new UntypedFormGroup({
      filename: new UntypedFormControl('', [Validators.required, uniqueFileNameValidator(this.alreadyExistingFileName)]),
      type: new UntypedFormControl('', [Validators.required]),
      standard: new UntypedFormControl('', [Validators.required]),
      subject: new UntypedFormControl('', [Validators.required]),
      description: new UntypedFormControl('', [Validators.required]),
      file: new UntypedFormControl('', [Validators.required]),
    });
  }

  async getAlreadyExistingFileName() {
    const response = await this.supabase.storage.from("pdfs").list();
    response?.data?.forEach((file: any) => {
      this.alreadyExistingFileName.push(file.name);
    });
  }

  addPdf(pdfData: any) {
    this.supabase.from("pdfs").insert([pdfData]).then((response) => {
      console.log(response);
    });
  }

  onStandardChange(selectedStandard: string) {
    this.subjectOptions = this.subjects[selectedStandard];
  }

  getErrorMessage(controlName: string) {
    if (this.pdfForm.get(controlName)?.hasError('required')) {
      return this.errorMessages[controlName];
    }

    return '';
  }

  onUpload(event: any) {
    // Get the selected file
    const [file] = event.target.files;
    // Get the file name and size
    const { name: fileName } = file;
    this.file = file;
    this.fileName = fileName
  }

  uploadFile() {
    if (!this.file) {
      this._snackBar.open("Select PDF to uplaod", "Ok");
      return;
    }

    if (this.alreadyExistingFileName.includes(this.fileName)) {
      this._snackBar.open(this.fileName + " already exists !!", "Ok");
      return;
    }


    // Upload the file to the server
    this.supabase.storage.from("pdfs").upload(this.fileName, this.file).then((response) => {
      console.log(response);
    });

    const formValue = this.pdfForm.getRawValue();
    delete formValue.file;

    this.supabase.from("pdfs").insert([{ ...formValue, fileURL: this.fileName }]).then((response) => {
      if (response.error) {
        this._snackBar.open(response.error.message, "Ok");
      } else {
        this._snackBar.open("PDF uploaded successfully", "Ok");
        this.resetForm();
      }
    });
  }

  resetForm() {
    this.pdfForm.markAsUntouched();
    this.pdfForm.markAsPristine();
    this.pdfForm.controls['filename'].reset('');
    this.pdfForm.controls['type'].reset('');
    this.pdfForm.controls['standard'].reset('');
    this.pdfForm.controls['subject'].reset('');
    this.pdfForm.controls['description'].reset('');
    this.pdfForm.controls['file'].reset('');

    Object.keys(this.pdfForm.controls).forEach(controlName => {
      this.pdfForm.controls[controlName].setErrors(null);
      this.pdfForm.controls[controlName].markAsPristine();
      this.pdfForm.controls[controlName].markAsUntouched();
    });

    this.file = null;
    this.fileName = '';
  }

}
