import { Component, EventEmitter, Output } from '@angular/core';
import * as asn1js from 'asn1js';
import * as pkijs from 'pkijs';
import { CertificationService } from '../../services/certification-storage.service';

export interface IFileContent {
  commonName: string,
  issuerCN: string,
  validFrom: Date,
  validTo: Date,
}

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss'
})
export class FileInputComponent {
  constructor(private certificationService: CertificationService) {  }

  @Output() fileChange = new EventEmitter<IFileContent>()

  public fileContent?: IFileContent;
  public isDragging: boolean = false;

  public stopDrag(event: Event): void {
    this.isDragging = false;
    event.preventDefault();
    event.stopPropagation();
  }

  public onDragOver(event: Event): void {
    event.preventDefault();
    this.isDragging = true;
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();

    this.isDragging = false;

    const dt = event.dataTransfer;
    let file: File;

    if(!dt) throw 'dataTransfer дорівнює null';

    if(dt.items) {
      const item = dt.items[0]
      if (!item) throw 'Відсутній файл в items у dataTransfer при події onDrop';
      if (item.kind !== 'file') throw 'В items у dataTransfer знаходиться строка, а не файл';
      file = item.getAsFile() as File;
    } else {
      const item = dt.files[0];
      if(!item) throw 'Відсутній файл в files у dataTransfer при події onDrop';
      file = item;
    }

    if(file) {
      this.readCertificate(file);
    }

  }

  public onFileChange(event: Event): void{ 
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files[0];

    if(file) {
      this.readCertificate(file);
    }
  }
  
  private readCertificate(file: File): void {
    const reader = new FileReader();
    
    reader.readAsArrayBuffer(file);
    
    reader.onload = (e) => {
      const target = e.target;
      if(!target) throw 'Відсутній e.target під час reader.onload';
      const content = target.result;
      if(!content) throw 'Відсутній result під час reader.onload';
      this.parseCertificate(content as ArrayBuffer);
      this.fileChange.emit(this.fileContent);
      if(this.fileContent) this.certificationService.saveSert(this.fileContent);
    };

  }

  private parseCertificate(content: ArrayBuffer): void {
    const asn1 = asn1js.fromBER(content);
    if(asn1.result.constructor.name !== 'Sequence'){
      throw 'Неправильна структура конверта сертифіката (очікується SEQUENCE)';
    }
    const certificate: IFileContent = this.extractCertificateInfo(asn1.result);
    this.fileContent = certificate;
  }

  private extractCertificateInfo(certificate: asn1js.AsnType): IFileContent {
    const cert = new pkijs.Certificate({ schema: certificate })
    // Отримуємо CommonName
    const subject = cert.subject;
    const commonName = this.findValueByRelativeAttributeType(subject.typesAndValues, '2.5.4.3')
    // Отримуємо IssuerCN
    const issuer = cert.issuer;
    const issuerCN = this.findValueByRelativeAttributeType(issuer.typesAndValues, '2.5.4.3')
    // Отримуємо значення validity:
    const validFrom = cert.notBefore.value;
    const validTo = cert.notAfter.value;
    return {
      commonName,
      issuerCN,
      validFrom,
      validTo
    }
  }

  private findValueByRelativeAttributeType (array: pkijs.AttributeTypeAndValue[], type: string): string {
    const el = array.find((el) => el.type === type);
    const value = el?.value.valueBlock.value
    return value || '';
  }

  // private dateParser (date: Date): string {
  //   return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  // }
}
