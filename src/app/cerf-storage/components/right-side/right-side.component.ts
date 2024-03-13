import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFileContent } from '../file-input/file-input.component';

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrl: './right-side.component.scss'
})
export class RightSideComponent {
  @Input() isAddCertificate: boolean = false;
  @Input() certificateInfo?: IFileContent;
  @Output() fileChange = new EventEmitter<IFileContent>()

  public onFileChange(file: IFileContent): void {
    this.fileChange.emit(file)
  }
}
