import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { NavbarLoggedComponent } from "../../navbar_loggedin/navbar_loggedin.component";

@Component({
  selector: 'app-edit-user-details',
  imports: [NavbarComponent, NavbarLoggedComponent],
  templateUrl: './edit-user-details.component.html',
  styleUrl: './edit-user-details.component.css'
})
export class EditUserDetailsComponent {

}
