import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppReducers } from './redux/state.model';
import { UserEffects } from './redux/effects/user.effects';
import { FlightsEffects } from './redux/effects/flights.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(AppReducers, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([UserEffects, FlightsEffects]),
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right', maxOpened: 3 }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
