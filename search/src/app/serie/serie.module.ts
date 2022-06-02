import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SerieRoutingModule } from './serie-routing.module';
import { SerieComponent } from './serie.component';


@NgModule({
  declarations: [
    SerieComponent
  ],
  imports: [
    CommonModule,
    SerieRoutingModule
  ]
})
export class SerieModule { }
