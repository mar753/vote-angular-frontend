import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { VotePageComponent } from './vote-page/vote-page.component';

@NgModule({
  declarations: [
    AppComponent,
    VotePageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
