import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestListComponent } from './dest-list/dest-list.component';
import { DestinationFormComponent } from './destination-form/destination-form.component';
import { DestinationService } from './destination.service';

@NgModule({
  declarations: [
    AppComponent,
    DestListComponent,
    DestinationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DestinationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
