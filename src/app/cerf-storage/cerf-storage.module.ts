import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSideComponent } from './components/left-side/left-side.component';
import { CerfStorageComponent } from './components/cerf-storage/cerf-storage.component';
import { RightSideComponent } from './components/right-side/right-side.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { CertificationService } from './services/certification-storage.service';
import { CertInfoComponent } from './components/cert-info/cert-info.component';
import { CertListComponent } from './components/cert-list/cert-list.component';

@NgModule({
  declarations: [
    LeftSideComponent,
    CerfStorageComponent,
    RightSideComponent,
    FileInputComponent,
    CertInfoComponent,
    CertListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CerfStorageComponent
  ],
  providers: [
    CertificationService
  ]
})
export class CerfStorageModule { }
