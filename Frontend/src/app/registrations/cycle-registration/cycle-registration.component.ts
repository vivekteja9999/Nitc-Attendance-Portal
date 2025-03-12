import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarLoggedComponent } from "../../navbar_loggedin/navbar_loggedin.component";
import { CycleService } from '../cycle.service';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cycle-registration',
  imports: [FormsModule, NavbarLoggedComponent],
  templateUrl: './cycle-registration.component.html',
  styleUrl: './cycle-registration.component.css'
})
export class CycleRegistrationComponent {
  location: string = "";
  cycleId: string = "";
  gearType:string = "";
  constructor(private cycleService:CycleService,private toast:ToastrService){}
  registerCycle(){
    if (!this.cycleId || !this.location || !this.gearType) {
      alert('Please enter all details');
      return;
    }
    this.cycleService.registerCycle(this.cycleId,this.location,this.gearType).subscribe(
      response =>{
        const qrCodeUrl = response.qrCode;
        this.cycleService.downloadQrCode("QR_"+this.cycleId+".png").subscribe(response => {
          const blob = new Blob([response], { type: 'image/png' });  // ✅ Convert to Blob
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = this.cycleId + "_QRCode.png";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        });
        this.toast.success(`Sucessfully registered Cycle ${this.cycleId}`)
        this.cycleId = '';
        this.location = '';
        this.gearType = '';
      },
      error=>{
        this.toast.error("Unable to register cycle");
      }
    )
  }  
}
