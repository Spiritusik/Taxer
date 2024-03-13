import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFileContent } from '../file-input/file-input.component';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrl: './left-side.component.scss'
})
export class LeftSideComponent {
  @Input() isAddCertificate: boolean = false;
  @Input() certificates: IFileContent[] = [];
  @Input() selectedCertificateId: number = -1;
  @Output() isAddCertificateSwitchEvent = new EventEmitter<boolean>();
  @Output() selectedCertificateChange = new EventEmitter();

  public onSelectedCertificateChange(id: number) {
    this.selectedCertificateChange.emit(id);
  }

  public onButtonClick() {
    this.isAddCertificateSwitchEvent.emit(!this.isAddCertificate);
  }
}
