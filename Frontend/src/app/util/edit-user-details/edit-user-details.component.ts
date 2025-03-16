import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { NavbarLoggedComponent } from '../../navbar_loggedin/navbar_loggedin.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.css'],
  imports:[FormsModule,CommonModule,NavbarLoggedComponent]
})
export class EditUserDetailsComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchEmail: string = '';
  selectedUser: any = null;
  newRole: string = '';

  constructor(private userService: UserService, private toast: ToastrService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
        this.filteredUsers = data;
      },
      error => {
        this.toast.error("Failed to fetch users");
      }
    );
  }

  searchUser() {
    if (this.searchEmail.trim() === '') {
      this.filteredUsers = this.users;
      return;
    }

    this.userService.searchUserByEmail(this.searchEmail).subscribe(
      (data) => {
        this.filteredUsers = [data];
      },
      (error) => {
        this.toast.error("User not found");
        this.filteredUsers = [];
      }
    );
  }

  selectUser(user: any) {
    this.selectedUser = { ...user };
    this.newRole = user.role;
    this.filteredUsers = []; // Hide the user list
  }

  updateRole() {
    if (!this.selectedUser) {
      this.toast.error("No user selected");
      return;
    }

    this.userService.updateUserRole(this.selectedUser.id, this.newRole).subscribe({
      next: () => {
        this.toast.success('User role updated successfully');
        this.selectedUser = null; // Hide edit form
        this.loadUsers(); // Refresh the user list
      },
      error: (err) => {
        this.toast.error('Failed to update user role');
        console.error(err);
      }
    });
  }

  cancelEdit() {
    this.selectedUser = null;
    this.filteredUsers = this.users; // Show the user list again
  }
}