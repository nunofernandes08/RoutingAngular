import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HeroesModule } from './heroes/heroes.module';
import { CrisesModule } from './crises/crises.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CrisisCenterComponent } from './crises/crisis-center/crisis-center.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HeroesModule,
    CrisesModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    CrisisCenterComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }