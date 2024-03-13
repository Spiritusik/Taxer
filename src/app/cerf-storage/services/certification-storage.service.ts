import { Injectable } from '@angular/core';
import { IFileContent } from '../components/file-input/file-input.component';

@Injectable()
export class CertificationService {

  public getSert(): IFileContent[] {
    const cert = localStorage.getItem('certificates');
    if(cert) {
      return JSON.parse(cert);
    }
    return [];
  }

  public saveSert(file: IFileContent): void {
    const cert = this.getSert();
    cert.push(file);
    localStorage.setItem('certificates', JSON.stringify(cert));
  }
}
