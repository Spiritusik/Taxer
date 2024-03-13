import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFileContent } from '../file-input/file-input.component';

@Component({
  selector: 'app-cert-list',
  templateUrl: './cert-list.component.html',
  styleUrl: './cert-list.component.scss'
})
export class CertListComponent {
  @Input() certificates: IFileContent[] = [];
  @Input() selectedCertificateId: number = -1;
  @Output() selectedCertificateChange = new EventEmitter();

  public onChange(id: number) {
    this.selectedCertificateChange.emit(id);
  }
}
