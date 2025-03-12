import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { routes } from './app.routes';
import { AuthGuard } from './auth/auth.guard';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),importProvidersFrom(BrowserModule,FormsModule,HttpClientModule,RouterModule),AuthGuard,provideAnimations(),provideToastr(
    {
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton:true,
      progressBar:true,
    }
  )],
};
