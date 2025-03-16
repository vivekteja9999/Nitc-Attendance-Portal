import { Component } from '@angular/core';
import { NavbarLoggedComponent } from "../../navbar_loggedin/navbar_loggedin.component";
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CycleService } from '../../registrations/cycle.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin-dashboard',
  imports: [NavbarLoggedComponent,FormsModule,CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  cycleId:String = "";
  constructor(private router:Router,private cycleService:CycleService,private toast:ToastrService){}
  downloadQr(){
    if (!this.cycleId) {
      this.toast.error("Please enter a Cycle Number/Name");
      return;
    }
    const filename = `QR_${this.cycleId}.png`;
    this.cycleService.downloadQrCode(filename).subscribe(response => {
      const blob = new Blob([response], { type: 'image/png' });  // ✅ Convert to Blob
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = this.cycleId + "_QRCode.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 
   error=>{
    this.toast.error("Resource Not Found!!");
   }
  );
  }
  navigateToCycleRegistrationForm(){
    this.router.navigate(["/cycles/register"]);
  }
  navigateToKeyRegistrationForm(){
    this.router.navigate(["/keys/register"])
  }
  navigateToEditUserDetails(){
    this.router.navigate(["/users/edit"])
  }
}
