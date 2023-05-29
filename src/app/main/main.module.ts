import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './pages/main-page.component';
import { FlightFormComponent } from './components/flight-form/flight-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MainPageComponent, FlightFormComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
