import { Component, Input } from '@angular/core';
import { IFileContent } from '../file-input/file-input.component';

@Component({
  selector: 'app-cert-info',
  templateUrl: './cert-info.component.html',
  styleUrl: './cert-info.component.scss'
})
export class CertInfoComponent {
  @Input() certificateInfo?: IFileContent;
}
