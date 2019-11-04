import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactMeComponent } from './contact-me/contact-me.component';

import { ContactMeService } from './contact-me.service';

@NgModule({
  declarations: [
    AppComponent,
    ContactMeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ContactMeComponent, pathMatch: 'full' }
    ])
  ],
  providers: [ContactMeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
