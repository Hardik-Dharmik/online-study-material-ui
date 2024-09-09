import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPdfsComponent } from './all-pdfs.component';

describe('AllPdfsComponent', () => {
  let component: AllPdfsComponent;
  let fixture: ComponentFixture<AllPdfsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllPdfsComponent]
    });
    fixture = TestBed.createComponent(AllPdfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
