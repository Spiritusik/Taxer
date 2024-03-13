import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CerfStorageModule } from './cerf-storage/cerf-storage.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CerfStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
