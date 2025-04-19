import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./Login/login.component";
import { UserDashboardComponent } from './dashboards/user-dashboard/user-dashboard.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , ZXingScannerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
