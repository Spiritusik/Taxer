import { Component } from '@angular/core';
import { CertificationService } from '../../services/certification-storage.service';
import { IFileContent } from '../file-input/file-input.component';

@Component({
  selector: 'app-cerf-storage',
  templateUrl: './cerf-storage.component.html',
  styleUrl: './cerf-storage.component.scss'
})
export class CerfStorageComponent {
  public isAddCertificate: boolean = true;
  public certificates: IFileContent[] = [];
  public selectedCertificateId: number = -1;

  public onFileLoad(file: IFileContent): void {
    this.certificates.push(file);
    this.selectedCertificateId = this.certificates.length - 1;
    this.isAddCertificate = true;
}

  public onSelectedCertificateChange(id: number) {
    this.selectedCertificateId = id;
  }

  constructor(private certificationService: CertificationService) {
    this.certificates = certificationService.getSert();
  }

  public isAddCertificateSwitchEvent(isAdd: boolean) {
    this.isAddCertificate = isAdd;
  }
}
