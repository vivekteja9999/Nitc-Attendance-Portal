import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './app/navbar/navbar.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner'; 

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
